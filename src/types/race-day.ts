import type { Category, DisciplineSlug } from '@/types'

// Frontend domain contracts only. They do not declare Supabase tables, APIs,
// storage buckets, timing-provider fields, associations, or RLS behaviour.
export type ResultPublicationState = 'unavailable' | 'provisional' | 'official' | 'disqualified'
export type RaceSplitKind = DisciplineSlug | 'transition_one' | 'transition_two'
export type LeaderboardKind = 'overall' | DisciplineSlug | 'team' | 'challenge' | 'participation'
export type PhotoConsentState = 'unknown' | 'allowed' | 'restricted' | 'withdrawn'
export type MemoryCardKind = 'completion' | 'result' | 'digital_bib' | 'story' | 'team' | 'challenge'
export type CapabilityState = 'available' | 'timing_required' | 'storage_required' | 'backend_required' | 'decision_required'

export interface RaceSplit {
  kind: RaceSplitKind
  duration_seconds: number | null
  rank: number | null
}

export interface ParticipantResult {
  participant_id: string
  display_name: string
  bib_number: string | null
  category: Category | null
  status: ResultPublicationState
  overall_seconds: number | null
  splits: RaceSplit[]
  published_at: string | null
}

export interface LeaderboardFilterContract {
  kind: LeaderboardKind
  category: Category | null
  gender: string | null
  age_group: string | null
}

export interface EventPhoto {
  id: string
  album_id: string
  image_url: string
  download_url: string | null
  photographer_credit: string
  bib_numbers: string[]
  consent: PhotoConsentState
}

export interface RaceDayCapability {
  id: string
  label: string
  description: string
  status: CapabilityState
}
