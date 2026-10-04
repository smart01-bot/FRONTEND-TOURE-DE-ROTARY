import type { Metadata } from 'next'
import Link from 'next/link'
import CourseMapExperience from '@/components/course-map/CourseMapExperience'
import PublicPage from '@/components/public/PublicPage'

export const metadata: Metadata = {
  title: 'Course and Dar map',
  description: 'Explore Tour de Dar swim, bike, run and event-logistics map views. Unconfirmed course information is marked TBD.',
}

export default function CourseMapPage() {
  return (
    <PublicPage current="/course-map" eyebrow="Explore / Dar es Salaam" title="Three disciplines. One journey." description="Explore SWIM, BIKE, RUN and event logistics. Only reviewed routes and locations appear on the map." action={<><Link href="/race-info">Race information ↗</Link><a href="#map-list-heading">Read the map as text ↓</a></>}>
      <CourseMapExperience />
    </PublicPage>
  )
}
