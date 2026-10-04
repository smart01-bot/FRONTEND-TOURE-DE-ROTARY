import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import PublicPage from '@/components/public/PublicPage'
import styles from '@/components/public/public.module.css'
import { COMMUNITY_GUIDELINES } from '@/config/community'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'Community guidelines',
  description: 'How Tour de Dar participants can keep the event community respectful, safe and useful.',
}
export default function CommunityGuidelinesPage() {
  return (
    <PublicPage current="/community-guidelines" eyebrow="Belong / Tour de Dar" title="A community worth joining." description="The Run-Up helps participants prepare, encourage one another and feel part of Tour de Dar." action={<Link href="/feed">Open the community ↗</Link>}>

      <section className={styles.content}>
        <div className="mx-auto max-w-wide">
          <div className={styles.grid}>
            {COMMUNITY_GUIDELINES.map((guideline, index) => (
              <article key={guideline.id} className={styles.card}>
                <p className="font-num text-[10px] font-extrabold uppercase tracking-[.13em] text-bronze-700">
                  Guideline {index + 1}
                </p>
                <h2 className="mt-2 font-serif text-[19px] font-bold text-navy">{guideline.title}</h2>
                <p className="mt-2 font-sans text-body-sm leading-6 text-ink-muted">{guideline.description}</p>
              </article>
            ))}
          </div>

          <aside className="mt-5 rounded-card border border-[#e8c7c1] bg-white p-5 shadow-card" aria-labelledby="reporting-title">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#fff2ef] text-coral-dark">
                <AlertTriangle size={17} />
              </span>
              <div>
                <h2 id="reporting-title" className="font-serif text-[18px] font-bold text-navy">Reporting status</h2>
                <p className="mt-1 font-sans text-body-sm leading-6 text-ink-muted">
                  In-platform reports are not yet stored or reviewed because the moderation service and access policies have not been approved. The interface will never claim a report was submitted when it was not.
                </p>
                <p className="mt-3 font-sans text-body-sm text-ink-muted">
                  For an urgent safety or privacy concern, email{' '}
                  <a className="font-bold text-navy underline underline-offset-4" href={`mailto:${SITE.contact.email}`}>
                    {SITE.contact.email}
                  </a>.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

    </PublicPage>
  )
}
