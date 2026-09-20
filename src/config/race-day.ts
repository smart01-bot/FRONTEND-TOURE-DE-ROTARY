import type { MemoryCardKind, RaceDayCapability } from '@/types/race-day'

export const RESULT_CAPABILITIES: RaceDayCapability[] = [
  { id: 'overall', label: 'Overall finishing time', description: 'Requires an official timing record matched to a participant.', status: 'timing_required' },
  { id: 'splits', label: 'Swim, bike and run splits', description: 'Includes transitions only when the timing provider supplies them.', status: 'timing_required' },
  { id: 'status', label: 'Result status', description: 'Provisional, official and disqualified states require organiser rules.', status: 'decision_required' },
]

export const LEADERBOARD_CAPABILITIES: RaceDayCapability[] = [
  { id: 'performance', label: 'Overall and discipline rankings', description: 'Rankings must be calculated from verified timing data.', status: 'timing_required' },
  { id: 'filters', label: 'Category, gender and age-group filters', description: 'Shown only when the approved result contract supplies those fields.', status: 'backend_required' },
  { id: 'community', label: 'Team and challenge rankings', description: 'Requires real membership, participation and completion records.', status: 'backend_required' },
]

export const PHOTO_CAPABILITIES: RaceDayCapability[] = [
  { id: 'gallery', label: 'Albums and event gallery', description: 'Requires approved image storage, album records and photographer credits.', status: 'storage_required' },
  { id: 'find-me', label: 'Find Me by bib', description: 'Requires an approved bib-to-photo association process.', status: 'backend_required' },
  { id: 'privacy', label: 'Consent and removal', description: 'Requires enforceable photo visibility and withdrawal rules.', status: 'decision_required' },
]

export const MEMORY_CARD_AVAILABILITY: Record<MemoryCardKind, RaceDayCapability> = {
  digital_bib: { id: 'digital_bib', label: 'Digital-bib card', description: 'Available from the signed-in participant’s verified registration when a bib is assigned.', status: 'available' },
  story: { id: 'story', label: 'Participant-story card', description: 'Available privately when the signed-in participant has saved a real story.', status: 'available' },
  completion: { id: 'completion', label: '“I did Tour de Dar” card', description: 'Requires a verified completion record; registration alone is not completion.', status: 'timing_required' },
  result: { id: 'result', label: 'Result card', description: 'Requires a verified published result.', status: 'timing_required' },
  team: { id: 'team', label: 'Team card', description: 'Requires a real team membership record.', status: 'backend_required' },
  challenge: { id: 'challenge', label: 'Challenge-completion card', description: 'Requires a verified challenge completion.', status: 'backend_required' },
}

// Intentionally empty until organiser-approved timing and photography contracts exist.
export const PUBLISHED_RESULTS = []
export const PUBLISHED_LEADERBOARDS = []
export const PHOTO_ALBUMS = []
