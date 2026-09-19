'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Tour de Rotary — useFeed Hook
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import {
  getFeedPosts,
  createPost as apiCreatePost,
  toggleReaction as apiToggleReaction,
} from '@/lib/supabase/feed'
import type { FeedPost, CreatePostPayload, ReactionEmoji } from '@/types/feed'

export function useFeed() {
  const [posts,         setPosts]         = useState<FeedPost[]>([])
  const [loading,       setLoading]       = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const reload = useCallback(async () => {
    const data = await getFeedPosts()
    setPosts(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setCurrentUserId(data.user?.id ?? null))
    void reload()

    const channel = supabase
      .channel('feed-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' },          () => void reload())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'post_reactions' }, () => void reload())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'post_comments' },  () => void reload())
      .subscribe()

    return () => { void supabase.removeChannel(channel) }
  }, [reload])

  const createPost = useCallback(async (payload: CreatePostPayload) => {
    await apiCreatePost(payload)
    await reload()
  }, [reload])

  const toggleReaction = useCallback(async (postId: string, emoji: ReactionEmoji) => {
    if (!currentUserId) return

    // Optimistic update
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post

      const existing = post.reactions.find(r => r.user_id === currentUserId)
      let reactions  = [...post.reactions]

      if (existing) {
        if (existing.emoji === emoji) {
          reactions = reactions.filter(r => r.user_id !== currentUserId)
        } else {
          reactions = reactions.map(r =>
            r.user_id === currentUserId ? { ...r, emoji } : r,
          )
        }
      } else {
        reactions = [...reactions, { post_id: postId, user_id: currentUserId, emoji }]
      }

      return { ...post, reactions }
    }))

    try {
      await apiToggleReaction(postId, emoji)
    } catch {
      // Roll the optimistic change back to the server's truth
      await reload()
    }
  }, [currentUserId, reload])

  return { posts, loading, currentUserId, createPost, toggleReaction }
}
