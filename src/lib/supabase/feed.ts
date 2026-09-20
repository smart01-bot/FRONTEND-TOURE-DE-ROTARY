// ─────────────────────────────────────────────────────────────────────────────
// Tour de Rotary — Feed Supabase Helpers
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from '@/lib/supabase/client'
import type { FeedPost, CreatePostPayload, PostComment, ReactionEmoji } from '@/types/feed'

// ── Feed posts ─────────────────────────────────────────────────────────────

async function fetchFeedPosts(userId?: string): Promise<FeedPost[]> {
  // Step 1 — posts
  let query = supabase
    .from('posts')
    .select('id, user_id, content, post_type, discipline, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  if (userId) query = query.eq('user_id', userId)

  const { data: posts, error } = await query

  if (error) throw error
  if (!posts || posts.length === 0) return []

  const userIds = [...new Set(posts.map(p => p.user_id))]
  const postIds = posts.map(p => p.id)

  // Step 2 — profiles, registrations, reactions, comment counts (parallel)
  const [
    { data: profiles },
    { data: registrations },
    { data: reactions },
    { data: comments },
  ] = await Promise.all([
    supabase.from('profiles').select('id, full_name').in('id', userIds),
    supabase.from('registrations').select('user_id, category, bib_number').in('user_id', userIds),
    supabase.from('post_reactions').select('post_id, user_id, emoji').in('post_id', postIds),
    supabase.from('post_comments').select('id, post_id').in('post_id', postIds),
  ])

  const profileMap      = Object.fromEntries((profiles ?? []).map(p => [p.id, p]))
  const registrationMap = Object.fromEntries((registrations ?? []).map(r => [r.user_id, r]))

  return posts.map(p => ({
    id:            p.id,
    user_id:       p.user_id,
    content:       p.content,
    post_type:     p.post_type,
    discipline:    p.discipline,
    created_at:    p.created_at,
    full_name:     profileMap[p.user_id]?.full_name ?? 'Athlete',
    category:      registrationMap[p.user_id]?.category ?? null,
    bib_number:    registrationMap[p.user_id]?.bib_number ?? null,
    reactions:     (reactions ?? []).filter(r => r.post_id === p.id),
    comment_count: (comments ?? []).filter(c => c.post_id === p.id).length,
  }))
}

export async function getFeedPosts(): Promise<FeedPost[]> {
  return fetchFeedPosts()
}

/** Authenticated participant activity. Never use this as a public-profile query. */
export async function getParticipantPosts(userId: string): Promise<FeedPost[]> {
  return fetchFeedPosts(userId)
}

// ── Create post ────────────────────────────────────────────────────────────

export async function createPost(payload: CreatePostPayload): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase.from('posts').insert({
    user_id:   user.id,
    content:   payload.content.trim(),
    post_type: payload.post_type,
    ...(payload.discipline ? { discipline: payload.discipline } : {}),
  })

  if (error) throw error
}

// ── Toggle reaction ────────────────────────────────────────────────────────

export async function toggleReaction(postId: string, emoji: ReactionEmoji): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: existing } = await supabase
    .from('post_reactions')
    .select('emoji')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    if (existing.emoji === emoji) {
      // Remove reaction
      await supabase.from('post_reactions')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id)
    } else {
      // Switch emoji
      await supabase.from('post_reactions')
        .update({ emoji })
        .eq('post_id', postId)
        .eq('user_id', user.id)
    }
  } else {
    await supabase.from('post_reactions')
      .insert({ post_id: postId, user_id: user.id, emoji })
  }
}

export async function getPostComments(postId: string): Promise<PostComment[]> {
  const { data: comments, error } = await supabase.from('post_comments')
    .select('id, post_id, user_id, content, created_at')
    .eq('post_id', postId).order('created_at', { ascending: true })
  if (error) throw error
  if (!comments?.length) return []
  const ids = [...new Set(comments.map(comment => comment.user_id))]
  const { data: profiles } = await supabase.from('profiles').select('id, full_name').in('id', ids)
  const names = Object.fromEntries((profiles ?? []).map(profile => [profile.id, profile.full_name]))
  return comments.map(comment => ({ ...comment, full_name: names[comment.user_id] ?? 'Athlete' }))
}

export async function createComment(postId: string, content: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  const { error } = await supabase.from('post_comments').insert({ post_id: postId, user_id: user.id, content: content.trim() })
  if (error) throw error
}

export async function updatePost(postId: string, content: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  const { error } = await supabase.from('posts').update({ content: content.trim() }).eq('id', postId).eq('user_id', user.id)
  if (error) throw error
}

export async function deletePost(postId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  const { error } = await supabase.from('posts').delete().eq('id', postId).eq('user_id', user.id)
  if (error) throw error
}
