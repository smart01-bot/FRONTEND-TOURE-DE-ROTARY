import type {
  ChallengeDefinition,
  CommunityCapability,
  ReportReason,
} from '@/types/community'

export interface CommunityGuideline {
  id: string
  title: string
  description: string
}

export const COMMUNITY_GUIDELINES: CommunityGuideline[] = [
  {
    id: 'respect',
    title: 'Encourage people; do not attack them.',
    description: 'Harassment, hate, intimidation and personal attacks do not belong in the Tour de Dar community.',
  },
  {
    id: 'privacy',
    title: 'Protect personal information.',
    description: 'Do not publish private contact, medical, payment or location information about yourself or anyone else.',
  },
  {
    id: 'photos',
    title: 'Get consent before sharing photos.',
    description: 'Only share images you have permission to publish, especially when children or identifiable participants appear.',
  },
  {
    id: 'safety',
    title: 'Keep training advice responsible.',
    description: 'Do not present unsafe instructions as official race, medical or emergency guidance.',
  },
  {
    id: 'relevance',
    title: 'Keep it useful and genuine.',
    description: 'Avoid spam, impersonation, misleading claims and content unrelated to the event community.',
  },
]

export const REPORT_REASONS: { value: ReportReason; label: string }[] = [
  { value: 'harassment', label: 'Harassment or bullying' },
  { value: 'hate_or_abuse', label: 'Hate or abusive content' },
  { value: 'privacy', label: 'Privacy concern' },
  { value: 'unsafe_advice', label: 'Unsafe advice' },
  { value: 'spam', label: 'Spam or misleading content' },
  { value: 'other', label: 'Something else' },
]

export const TEAM_CAPABILITIES: CommunityCapability[] = [
  { id: 'create', label: 'Create a team', description: 'Team identity, story and captain ownership.', status: 'backend_required' },
  { id: 'join', label: 'Join with a code or link', description: 'Invitation validation and membership creation.', status: 'backend_required' },
  { id: 'search', label: 'Search teams', description: 'Discover teams that allow new members.', status: 'backend_required' },
  { id: 'members', label: 'Members and roles', description: 'Captain/member permissions and member lists.', status: 'backend_required' },
  { id: 'activity', label: 'Statistics and activity', description: 'Real team participation derived from member activity.', status: 'backend_required' },
  { id: 'relay', label: 'Relay-team support', description: 'Relay membership and discipline assignments.', status: 'decision_required' },
]

export const CHALLENGE_CAPABILITIES: CommunityCapability[] = [
  { id: 'catalogue', label: 'Challenge list', description: 'Approved challenge definitions and event dates.', status: 'backend_required' },
  { id: 'join', label: 'Join a challenge', description: 'Participant enrolment and permission checks.', status: 'backend_required' },
  { id: 'progress', label: 'Progress and completion', description: 'A verified progress mechanism and completion record.', status: 'decision_required' },
  { id: 'history', label: 'Participant history', description: 'Real joined and completed challenge records.', status: 'backend_required' },
  { id: 'badge', label: 'Completion badge', description: 'Issued only after a real completion is recorded.', status: 'backend_required' },
  { id: 'share', label: 'Share completion', description: 'Enabled only for a participant’s real completion.', status: 'backend_required' },
]

// No organiser-approved challenges exist in the repository yet.
export const CHALLENGES: ChallengeDefinition[] = []
