import type { Category, DisciplineSlug } from '@/types'
import type { FeedPost } from '@/types/feed'

// Frontend domain contracts only. These types do not declare or imply
// Supabase tables, storage buckets, RLS policies, or API behaviour.

export type CommunityCapabilityStatus =
  | 'available'
  | 'backend_required'
  | 'storage_required'
  | 'decision_required'

export interface CommunityCapability {
  id: string
  label: string
  description: string
  status: CommunityCapabilityStatus
}

export type ModerationState =
  | 'visible'
  | 'report_pending'
  | 'under_review'
  | 'actioned'
  | 'dismissed'

export type ReportReason =
  | 'harassment'
  | 'hate_or_abuse'
  | 'privacy'
  | 'unsafe_advice'
  | 'spam'
  | 'other'

export interface ParticipantPrivacy {
  profile_public: boolean
  photo_public: boolean
  story_public: boolean
  activity_public: boolean
  bib_public: boolean
}

export interface PublicParticipantProfile {
  slug: string
  display_name: string
  avatar_url: string | null
  story: string | null
  category: Category | null
  discipline: DisciplineSlug | null
  bib_number: string | null
  activity: FeedPost[]
  team: TeamSummary | null
  completed_challenges: ChallengeCompletion[]
  privacy: ParticipantPrivacy
}

export type TeamKind = 'community' | 'relay'
export type TeamRole = 'captain' | 'member'

export interface TeamSummary {
  id: string
  slug: string
  name: string
  story: string | null
  kind: TeamKind
  member_count: number
}

export interface TeamMember {
  participant_slug: string
  display_name: string
  role: TeamRole
  relay_discipline: DisciplineSlug | null
}

export type ChallengeProgressMechanism =
  | 'self_attested'
  | 'organiser_verified'
  | 'activity_import'

export interface ChallengeDefinition {
  id: string
  slug: string
  title: string
  description: string
  starts_at: string
  ends_at: string
  progress_mechanism: ChallengeProgressMechanism
  target: number
  unit: string
}

export interface ChallengeCompletion {
  challenge_id: string
  completed_at: string
  badge_label: string
}
