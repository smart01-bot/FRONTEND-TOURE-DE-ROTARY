import type { Metadata } from 'next'
import Link from 'next/link'
import PublicPage from '@/components/public/PublicPage'
import styles from '@/components/public/public.module.css'
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
    <PublicPage current="/archive" eyebrow={ACTIVE_LIFECYCLE.editionLabel ?? 'Event edition'} title="The effort. The memories." description="The home for this event edition. Explore published stories and discover results, photographs and impact when they become available." accent="magenta">
      <section className={styles.content}>
        <div className="mx-auto max-w-wide">
          <aside className={styles.lifecycle} aria-labelledby="edition-status">
            <h2 id="edition-status">{ACTIVE_LIFECYCLE.label}</h2>
            <p>{ACTIVE_LIFECYCLE.summary}</p>
            <p>{ACTIVE_LIFECYCLE.registration.explanation} {ACTIVE_LIFECYCLE.community.explanation}</p>
          </aside>
          <aside className="mb-4 rounded-card border border-sand-dark bg-white p-5 shadow-card" aria-labelledby="dar-story-status">
            <p className="font-num text-[9px] font-extrabold uppercase tracking-[.12em] text-bronze">Story source status</p>
            <h2 id="dar-story-status" className="mt-2 font-serif text-[20px] font-bold text-navy">Old Dar × Modern Dar</h2>
            <p className="mt-2 max-w-content font-sans text-caption leading-relaxed text-ink-muted">Historical photographs, captions and event-history claims are not published because no verified source and usage-rights record has been approved. This space remains intentionally honest until licensed material is available.</p>
          </aside>
          <div className={styles.grid}>
            {SECTIONS.map(section => (
              <article key={section.label} className={styles.card}>
                <p className="font-num text-[9px] font-extrabold uppercase tracking-[.12em] text-bronze">{section.state}</p>
                <h2 className="mt-2 font-serif text-[21px] font-bold text-navy">{section.label}</h2>
                <p className="mt-2 font-sans text-caption leading-relaxed text-ink-muted">{section.detail}</p>
                <Link href={section.href} className="mt-4 inline-flex min-h-11 items-center font-sans text-[11px] font-bold text-navy underline underline-offset-4">Open {section.label.toLowerCase()}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicPage>
  )
}
