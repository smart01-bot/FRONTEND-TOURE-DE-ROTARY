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
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
} from '@/lib/supabase/feed'
import type { FeedPost, CreatePostPayload, ReactionEmoji } from '@/types/feed'

export function useFeed() {
  const [posts,         setPosts]         = useState<FeedPost[]>([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getFeedPosts()
      setPosts(data)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to load the community feed.')
    } finally {
      setLoading(false)
    }
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

  const updatePost = useCallback(async (postId: string, content: string) => { await apiUpdatePost(postId, content); await reload() }, [reload])
  const deletePost = useCallback(async (postId: string) => { await apiDeletePost(postId); await reload() }, [reload])

  return { posts, loading, error, currentUserId, reload, createPost, toggleReaction, updatePost, deletePost }
}
