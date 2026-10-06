import type { DisciplineSlug } from '@/types'

// Existing Tour photography; illustrative sport imagery, never event/participant evidence.
export const LANDING_MEDIA: Record<DisciplineSlug, { src: string; alt: string; credit: string }> = {
  swim: { src: '/assets/landing/pexels-jim-de-ramos-395808-1263349.jpg', alt: 'Swimmers moving through lanes in a pool', credit: 'Jim De Ramos' },
  bike: { src: '/assets/landing/pexels-daejeung-14226402.jpg', alt: 'Cyclists riding together on a road', credit: 'Daejeung' },
  run: { src: '/assets/landing/pexels-olly-3760259.jpg', alt: 'Runner preparing to start on an athletics track', credit: 'Olly' },
}
