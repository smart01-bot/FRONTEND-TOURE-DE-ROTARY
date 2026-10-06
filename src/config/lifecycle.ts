export type LifecycleMode = 'pre_event' | 'race_day' | 'memory' | 'archive'
export type RegistrationState = 'open' | 'upcoming' | 'closed'
export type CommunityState = 'open' | 'limited' | 'read_only'

export interface LifecycleConfig {
  mode: LifecycleMode
  label: string
  summary: string
  editionLabel: string | null
  registration: {
    state: RegistrationState
    explanation: string
  }
  community: {
    state: CommunityState
    explanation: string
  }
  primaryAction: { label: string; href: string }
  participantPriority: 'prepare' | 'race_day' | 'remember' | 'history'
}

const LIFECYCLE_CONFIGS: Record<LifecycleMode, LifecycleConfig> = {
  pre_event: {
    mode: 'pre_event',
    label: 'Pre-event',
    summary: 'Registration, preparation and the participant community are active.',
    editionLabel: '2026 Edition',
    registration: { state: 'open', explanation: 'Registration is currently open.' },
    community: { state: 'open', explanation: 'Registered participants can post and reply.' },
    primaryAction: { label: 'Register for TdDar 2026', href: '/register' },
    participantPriority: 'prepare',
  },
  race_day: {
    mode: 'race_day',
    label: 'Race day',
    summary: 'Immediate race information, the course map and participant ticket take priority.',
    editionLabel: '2026 Edition',
    registration: { state: 'closed', explanation: 'Registration is closed because race day is underway.' },
    community: { state: 'limited', explanation: 'Posting can be limited during race operations. Existing stories remain available.' },
    primaryAction: { label: 'View race-day information', href: '/race-info' },
    participantPriority: 'race_day',
  },
  memory: {
    mode: 'memory',
    label: 'Memory mode',
    summary: 'Stories and verified memories remain available after the event.',
    editionLabel: '2026 Edition',
    registration: { state: 'closed', explanation: 'Registration for this event edition has closed.' },
    community: { state: 'read_only', explanation: 'Posting is closed for this edition. Existing posts and stories remain readable.' },
    primaryAction: { label: 'View memories', href: '/results/memories' },
    participantPriority: 'remember',
  },
  archive: {
    mode: 'archive',
    label: 'Archive',
    summary: 'This historical edition is preserved as a read-only record.',
    editionLabel: '2026 Edition',
    registration: { state: 'closed', explanation: 'This edition is archived and no longer accepts registrations.' },
    community: { state: 'read_only', explanation: 'Archived community content is read-only.' },
    primaryAction: { label: 'Explore this edition', href: '/archive' },
    participantPriority: 'history',
  },
}

// Change this only after an organiser-approved lifecycle transition. Dates do
// not switch modes automatically because the repository has no verified
// operational transition schedule.
export const ACTIVE_LIFECYCLE_MODE: LifecycleMode = 'pre_event'

export const SAFE_LIFECYCLE_FALLBACK: LifecycleConfig = {
  mode: 'archive',
  label: 'Edition information unavailable',
  summary: 'This edition remains available to browse, but actions are paused until its status is confirmed.',
  editionLabel: null,
  registration: { state: 'closed', explanation: 'Registration status is unavailable, so registration is paused.' },
  community: { state: 'read_only', explanation: 'Posting is paused while the event status is unavailable.' },
  primaryAction: { label: 'View race information', href: '/race-info' },
  participantPriority: 'history',
}

export function getLifecycleConfig(mode: LifecycleMode = ACTIVE_LIFECYCLE_MODE): LifecycleConfig {
  return LIFECYCLE_CONFIGS[mode] ?? SAFE_LIFECYCLE_FALLBACK
}

export function resolveLifecycleConfig(mode: unknown): LifecycleConfig {
  return typeof mode === 'string' && mode in LIFECYCLE_CONFIGS
    ? LIFECYCLE_CONFIGS[mode as LifecycleMode]
    : SAFE_LIFECYCLE_FALLBACK
}

export const LIFECYCLE_TEST_STATES = (Object.keys(LIFECYCLE_CONFIGS) as LifecycleMode[])
  .map(mode => getLifecycleConfig(mode))

const configuredMode = process.env.NEXT_PUBLIC_EVENT_LIFECYCLE

export const ACTIVE_LIFECYCLE = configuredMode === undefined
  ? getLifecycleConfig()
  : resolveLifecycleConfig(configuredMode)
