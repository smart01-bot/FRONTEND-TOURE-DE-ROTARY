import type { Metadata } from 'next'
import Link from 'next/link'
import CourseMapExperience from '@/components/course-map/CourseMapExperience'
import HomeFooter from '@/components/home/HomeFooter'
import HomeNav from '@/components/home/HomeNav'

export const metadata: Metadata = {
  title: 'Course and Dar map',
  description: 'Explore Tour de Dar swim, bike, run and event-logistics map views. Unconfirmed course information is marked TBD.',
}

export default function CourseMapPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HomeNav />
      <section className="bg-navy px-5 pb-8 pt-10">
        <div className="mx-auto max-w-wide">
          <Link href="/race-info" className="inline-flex min-h-11 items-center font-sans text-caption text-white/75 underline underline-offset-4">
            Back to race information
          </Link>
          <h1 className="mt-3 font-serif text-headline text-white">
            Course &amp; Dar <span className="text-bronze">map.</span>
          </h1>
          <p className="mt-3 max-w-content font-sans text-body-sm leading-relaxed text-white/75">
            View swim, bike, run and event logistics separately. Only organiser-verified routes and locations will appear; unavailable information stays clearly marked TBD.
          </p>
        </div>
      </section>
      <CourseMapExperience />
      <HomeFooter />
    </main>
  )
}
