import type { Metadata } from 'next'
import Link from 'next/link'
import HomeNav from '@/components/home/HomeNav'
import HomeFooter from '@/components/home/HomeFooter'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'

export const metadata: Metadata = {
  title: 'Event edition',
  description: 'Tour de Dar event-edition stories, results, photos and impact, shown only when verified content is available.',
}

const SECTIONS = [
  { label: 'Stories', href: '/stories', state: 'Available', detail: 'Published participant stories remain accessible under their existing consent.' },
  { label: 'Results', href: '/results', state: 'Participant sign-in', detail: 'Results remain capability-gated until verified timing records exist.' },
  { label: 'Photos', href: '/results/photos', state: 'Participant sign-in', detail: 'Photos remain unavailable until storage, credits and consent contracts exist.' },
  { label: 'Impact', href: '/', state: 'Awaiting publication', detail: 'Verified impact figures have not been published in the repository.' },
] as const

export default function ArchivePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HomeNav />
      <section className="bg-navy px-5 py-10 text-white">
        <div className="mx-auto max-w-wide">
          <p className="font-num text-[10px] font-extrabold uppercase tracking-[.14em] text-bronze">{ACTIVE_LIFECYCLE.editionLabel ?? 'Event edition'}</p>
          <h1 className="mt-3 font-serif text-headline">Edition <span className="text-bronze">memory.</span></h1>
          <p className="mt-3 max-w-content font-sans text-body-sm leading-relaxed text-white/70">A truthful home for this event edition. Unpublished results, photos and impact remain clearly unavailable rather than being simulated.</p>
        </div>
      </section>
      <section className="bg-sand px-5 py-8">
        <div className="mx-auto max-w-wide">
          <aside className="mb-4 rounded-card border border-sand-dark bg-white p-5 shadow-card" aria-labelledby="dar-story-status">
            <p className="font-num text-[9px] font-extrabold uppercase tracking-[.12em] text-bronze">Story source status</p>
            <h2 id="dar-story-status" className="mt-2 font-serif text-[20px] font-bold text-navy">Old Dar × Modern Dar</h2>
            <p className="mt-2 max-w-content font-sans text-caption leading-relaxed text-ink-muted">Historical photographs, captions and event-history claims are not published because no verified source and usage-rights record has been approved. This space remains intentionally honest until licensed material is available.</p>
          </aside>
          <div className="grid gap-3 sm:grid-cols-2">
            {SECTIONS.map(section => (
              <article key={section.label} className="rounded-card bg-white p-5 shadow-card">
                <p className="font-num text-[9px] font-extrabold uppercase tracking-[.12em] text-bronze">{section.state}</p>
                <h2 className="mt-2 font-serif text-[21px] font-bold text-navy">{section.label}</h2>
                <p className="mt-2 font-sans text-caption leading-relaxed text-ink-muted">{section.detail}</p>
                <Link href={section.href} className="mt-4 inline-flex min-h-11 items-center font-sans text-[11px] font-bold text-navy underline underline-offset-4">Open {section.label.toLowerCase()}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <HomeFooter />
    </main>
  )
}
