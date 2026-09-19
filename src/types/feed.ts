// ─────────────────────────────────────────────────────────────────────────────
// Tour de Rotary — Feed Types
// ─────────────────────────────────────────────────────────────────────────────

import type { Category } from '@/types'

export type PostType       = 'general' | 'training' | 'milestone' | 'question' | 'team'
export type ReactionEmoji  = 'fire' | 'heart' | 'clap'
export type FeedDiscipline = 'swim' | 'bike' | 'run'

export interface PostReaction {
  post_id: string
  user_id: string
  emoji:   ReactionEmoji
}

export interface FeedPost {
  id:            string
  user_id:       string
  content:       string
  post_type:     PostType
  discipline:    FeedDiscipline | null
  created_at:    string
  // joined
  full_name:     string
  category:      Category | null
  bib_number:    string | null
  reactions:     PostReaction[]
  comment_count: number
}

export interface CreatePostPayload {
  content:    string
  post_type:  PostType
  discipline: FeedDiscipline | null
}
