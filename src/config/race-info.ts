import { CATEGORIES, PROCESSING_FEE_RATE } from '@/config/categories'
import { SITE } from '@/config/site'

/**
 * Phase 2 content contract.
 * Registration options come from the same configuration as the signup flow.
 * They are not evidence of organiser approval of a course, timetable or policy.
 * Replace a null fact only when an official source has been reviewed; record that
 * source in `source` and the review date in `reviewedOn`. Never infer race rules.
 */
export type RaceFact = { label: string } & (
  | { value: null }
  | { value: string; source: string; reviewedOn: string }
)

export type RaceSection = {
  id: string
  title: string
  description: string
  facts: RaceFact[]
  content?: 'categories' | 'waves' | 'registration' | 'faq' | 'guide'
}

export const RACE_REGISTRATION = {
  categories: CATEGORIES,
  processingFeeRate: PROCESSING_FEE_RATE,
  source: 'src/config/categories.ts; src/components/auth/steps/PayStep.tsx',
  note: 'These are the options and fees currently shown in registration. Official course confirmation and race-day instructions are TBD.',
}

// A published guide must have a reviewed official source and a real PDF asset.
export const RACE_GUIDE: {
  file: { href: string; source: string; reviewedOn: string } | null
  unavailableReason: string
} = {
  file: null,
  unavailableReason: 'TBD — the official race guide has not been published.',
}

const pending = (...labels: string[]): RaceFact[] => labels.map(label => ({ label, value: null }))

export const RACE_SECTIONS: RaceSection[] = [
  {
    id: 'overview', title: 'Event overview',
    description: SITE.description,
    facts: [
      { label: 'Location', value: SITE.event.location, source: 'src/config/site.ts; docs/TOUR-DE-DAR-PROJECT-BIBLE.md', reviewedOn: '2026-09-19' },
      // The existing site's date/venue have no official verification recorded.
      ...pending('Confirmed event date', 'Start venue', 'Finish venue'),
    ],
  },
  {
    id: 'categories', title: 'Categories and distances', content: 'categories',
    description: RACE_REGISTRATION.note,
    facts: pending('Official course distance confirmation'),
  },
  {
    id: 'waves', title: 'Start times and waves', content: 'waves',
    description: 'Start times, wave assignments and assembly instructions are awaiting official publication.',
    facts: pending('Wave allocation', 'Assembly location', 'Reporting time'),
  },
  {
    id: 'registration', title: 'Registration information', content: 'registration',
    description: 'Choose a category, enter your details and review payment in the registration flow. Relay registration includes a discipline choice.',
    facts: pending('Registration deadline', 'Race-pack collection', 'Check-in documents', 'Refund and transfer policy'),
  },
  {
    id: 'swim', title: 'Swim course',
    description: 'Official swim course information is awaiting publication.',
    facts: pending('Start and exit points', 'Route and turn markers', 'Course map', 'Cut-off time', 'Water conditions and cancellation procedure'),
  },
  {
    id: 'bike', title: 'Bike course',
    description: 'Official bike course information is awaiting publication.',
    facts: pending('Route and laps', 'Course map', 'Road closures and traffic controls', 'Aid and repair points', 'Cut-off time'),
  },
  {
    id: 'run', title: 'Run course',
    description: 'Official run course information is awaiting publication.',
    facts: pending('Route and laps', 'Course map', 'Aid and hydration points', 'Finish location', 'Cut-off time'),
  },
  {
    id: 'swim-to-bike', title: 'Swim-to-bike transition',
    description: 'The transition connects the swim and bike disciplines. Event-specific instructions are TBD.',
    facts: pending('Transition location and layout', 'Bike racking and access times', 'Equipment placement', 'Mount line', 'Relay handover procedure'),
  },
  {
    id: 'bike-to-run', title: 'Bike-to-run transition',
    description: 'The transition connects the bike and run disciplines. Event-specific instructions are TBD.',
    facts: pending('Transition location and layout', 'Dismount line', 'Bike return and collection', 'Run exit', 'Relay handover procedure'),
  },
  {
    id: 'athlete-requirements', title: 'Athlete requirements',
    description: 'Eligibility and participation rules require organiser confirmation.',
    facts: pending('Minimum age and age groups', 'Ability and qualification requirements', 'Waiver and identification', 'Relay eligibility', 'Accessibility arrangements'),
  },
  {
    id: 'equipment', title: 'Equipment requirements',
    description: 'The official equipment checklist has not been published.',
    facts: pending('Swim equipment and wetsuit rules', 'Bike and helmet requirements', 'Running equipment', 'Bib and timing-chip placement', 'Prohibited equipment'),
  },
  {
    id: 'safety', title: 'Safety information',
    description: 'Event-specific safety procedures are awaiting approval and publication.',
    facts: pending('Official safety briefing', 'Water safety cover', 'Road safety rules', 'Weather and cancellation procedure', 'Withdrawal procedure', 'Emergency contact'),
  },
  {
    id: 'medical', title: 'Medical information',
    description: 'Medical support locations and race-day contact details have not been published.',
    facts: pending('Medical stations', 'Race-day medical contact', 'How to request assistance', 'Medical disclosure requirements'),
  },
  {
    id: 'transport', title: 'Transport and parking',
    description: 'Travel and arrival arrangements are awaiting organiser confirmation.',
    facts: pending('Arrival point', 'Parking locations and charges', 'Public transport and shuttle services', 'Road access restrictions', 'Accessible drop-off', 'Spectator access'),
  },
  {
    id: 'schedule', title: 'Race-day schedule',
    description: 'All times and locations are TBD. The items below are information to be confirmed, not a published running order.',
    facts: pending('Check-in', 'Transition access', 'Athlete briefing', 'Race starts', 'Course closure', 'Awards', 'Equipment collection'),
  },
  {
    id: 'faq', title: 'Frequently asked questions', content: 'faq',
    description: 'Registration help and the status of official race information.', facts: [],
  },
  {
    id: 'guide', title: 'Downloadable race guide', content: 'guide',
    description: 'The official guide will be available here once published.', facts: [],
  },
]

export const RACE_FAQS = [
  { question: 'Where do I register?', answer: 'Open Registration information and choose Register to select your category and complete the registration steps.' },
  { question: 'Can I choose a relay discipline?', answer: 'Yes. The current registration flow lets relay participants choose swim, bike or run. Official team and handover rules are TBD.' },
  { question: 'When and where should I arrive?', answer: 'TBD — check-in time, start waves and arrival locations await official confirmation.' },
  { question: 'Can I change, transfer or cancel my entry?', answer: 'TBD — the organiser has not published a verified change, transfer or refund policy here.' },
  { question: 'Where are the course maps and race guide?', answer: 'TBD — official maps and the downloadable guide are not yet published here.' },
  { question: 'What does TBD mean?', answer: 'To be determined. That detail has not been verified for publication. Check this page again for confirmed race instructions.' },
]
