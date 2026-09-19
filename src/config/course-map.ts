/**
 * Phase 3 course-map contract.
 *
 * Operational map records must come from a reviewed organiser source. Route
 * lines and locations stay empty until that evidence exists; components render
 * an honest unavailable state instead of estimating coordinates or venues.
 */
export type CourseMapView = 'swim' | 'bike' | 'run' | 'event'

export type MapCoordinate = readonly [longitude: number, latitude: number]

export type VerifiedMapSource = {
  source: string
  reviewedOn: string
}

export type CourseRoute = VerifiedMapSource & {
  id: string
  name: string
  views: readonly CourseMapView[]
  description: string
  coordinates: readonly MapCoordinate[]
}

export type MapMarkerKind =
  | 'start'
  | 'finish'
  | 'transition'
  | 'safety'
  | 'aid'
  | 'hydration'
  | 'medical'
  | 'parking'
  | 'transport'
  | 'spectator'
  | 'check-in'
  | 'landmark'

export type CourseMapMarker = VerifiedMapSource & {
  id: string
  name: string
  kind: MapMarkerKind
  views: readonly CourseMapView[]
  description: string
  coordinate: MapCoordinate
}

export type CourseMapLayer = {
  id: CourseMapView
  label: string
  colour: string
  description: string
  unavailableReason: string
  relatedTransitions: readonly string[]
}

export const COURSE_MAP_LAYERS: readonly CourseMapLayer[] = [
  {
    id: 'swim',
    label: 'Swim',
    colour: '#4FC3F7',
    description: 'Swim route, water-safety points, start, exit and the approach to T1.',
    unavailableReason: 'TBD — the organiser has not published verified swim geometry or locations.',
    relatedTransitions: ['T1 · Swim to bike'],
  },
  {
    id: 'bike',
    label: 'Bike',
    colour: '#F59E0B',
    description: 'Bike route, course support, T1 exit and the approach to T2.',
    unavailableReason: 'TBD — the organiser has not published verified bike geometry or locations.',
    relatedTransitions: ['T1 · Swim to bike', 'T2 · Bike to run'],
  },
  {
    id: 'run',
    label: 'Run',
    colour: '#E85D3A',
    description: 'Run route, hydration and aid points, T2 exit and the finish.',
    unavailableReason: 'TBD — the organiser has not published verified run geometry or locations.',
    relatedTransitions: ['T2 · Bike to run'],
  },
  {
    id: 'event',
    label: 'Event',
    colour: '#C8953C',
    description: 'Registration, transport, parking, medical, spectator and event-logistics locations.',
    unavailableReason: 'TBD — the organiser has not published verified event-logistics locations.',
    relatedTransitions: ['T1 · Swim to bike', 'T2 · Bike to run'],
  },
] as const

export const COURSE_SEQUENCE = [
  { label: 'Swim', view: 'swim' },
  { label: 'T1', view: 'event' },
  { label: 'Bike', view: 'bike' },
  { label: 'T2', view: 'event' },
  { label: 'Run', view: 'run' },
] as const satisfies readonly { label: string; view: CourseMapView }[]

export const MAP_MARKER_LEGEND: readonly { kind: MapMarkerKind; label: string; colour: string }[] = [
  { kind: 'start', label: 'Start', colour: '#0D1B3D' },
  { kind: 'finish', label: 'Finish', colour: '#9F2B68' },
  { kind: 'transition', label: 'Transition', colour: '#C8953C' },
  { kind: 'safety', label: 'Safety', colour: '#1A3A2E' },
  { kind: 'aid', label: 'Aid', colour: '#866020' },
  { kind: 'hydration', label: 'Hydration', colour: '#4FC3F7' },
  { kind: 'medical', label: 'Medical', colour: '#E85D3A' },
  { kind: 'parking', label: 'Parking', colour: '#3D5183' },
  { kind: 'transport', label: 'Transport', colour: '#2D5E48' },
  { kind: 'spectator', label: 'Spectator', colour: '#9F2B68' },
  { kind: 'check-in', label: 'Check-in', colour: '#7886A9' },
  { kind: 'landmark', label: 'Landmark', colour: '#644714' },
] as const

// Populate only from reviewed organiser material. Each record requires source
// and review metadata through its type; do not add estimated geometry.
export const COURSE_ROUTES: readonly CourseRoute[] = []
export const COURSE_MAP_MARKERS: readonly CourseMapMarker[] = []

export function getCourseMapLayer(view: CourseMapView): CourseMapLayer {
  return COURSE_MAP_LAYERS.find(layer => layer.id === view) ?? COURSE_MAP_LAYERS[0]
}
