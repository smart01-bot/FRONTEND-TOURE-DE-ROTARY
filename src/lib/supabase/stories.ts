// ─────────────────────────────────────────────────────────────────────────────
// Tour de Dar — Stories Supabase Helpers
// ─────────────────────────────────────────────────────────────────────────────
import { supabase } from '@/lib/supabase/client'
import type { ApiResponse, Category, DisciplineSlug, Registration } from '@/types'

export interface PublicStory {
  id:         string
  full_name:  string
  category:   Category
  discipline: DisciplineSlug | null
  story:      string
  created_at: string
}

// ── getPublicStories ──────────────────────────────────────────────────────────
// Two-step fetch (registrations, then joined profiles) — same pattern as
// getFeedPosts in lib/supabase/feed.ts.
export async function getPublicStories(): Promise<PublicStory[]> {
  const { data: regs, error } = await supabase
    .from('registrations')
    .select('id, user_id, category, discipline, story, created_at')
    .eq('story_public', true)
    .not('story', 'is', null)
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) throw error
  if (!regs || regs.length === 0) return []

  const userIds = [...new Set(regs.map(r => r.user_id))]

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', userIds)

  const profileMap = Object.fromEntries((profiles ?? []).map(p => [p.id, p]))

  return regs
    .filter(r => !!r.story?.trim())
    .map(r => ({
      id:         r.id,
      full_name:  profileMap[r.user_id]?.full_name ?? 'Athlete',
      category:   r.category,
      discipline: r.discipline,
      story:      r.story as string,
      created_at: r.created_at,
    }))
}

// ── getFeaturedStory ──────────────────────────────────────────────────────────
// One story for the homepage teaser — most recent public story.
export async function getFeaturedStory(): Promise<PublicStory | null> {
  const stories = await getPublicStories()
  return stories[0] ?? null
}

// ── updateMyStory ──────────────────────────────────────────────────────────────
export async function updateMyStory(
  userId: string,
  updates: { story: string; story_public: boolean },
): Promise<ApiResponse<Registration>> {
  const { data, error } = await supabase
    .from('registrations')
    .update({
      story:        updates.story.trim() || null,
      story_public: updates.story_public,
    })
    .eq('user_id', userId)
    .select()
    .single()

  return {
    data:  data as Registration | null,
    error: error?.message ?? null,
  }
}
