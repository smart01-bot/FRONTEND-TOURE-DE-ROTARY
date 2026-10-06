import type { Metadata } from 'next'
import Link from 'next/link'
import PublicPage from '@/components/public/PublicPage'
import styles from '@/components/public/public.module.css'
import { RACE_FAQS, RACE_GUIDE, RACE_REGISTRATION, RACE_SECTIONS } from '@/config/race-info'
import { formatTSh } from '@/lib/utils'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'

export const metadata: Metadata = {
  title: 'Race information',
  description: 'Categories, registration, courses, transitions and race-day information for Tour de Dar. Unconfirmed details are marked TBD.',
}

export default function RaceInfoPage() {
  return (
    <PublicPage current="/race-info" eyebrow="Prepare / Tour de Dar" title="Your race. Every detail." description="Find your category, prepare for SWIM / BIKE / RUN and check race-day arrangements. Unconfirmed information is marked TBD." action={<Link href="/course-map">Explore the course map ↗</Link>}>

      <div className={styles.content}>
        <div className={styles.raceLayout}>
          <nav className={styles.topicNav} aria-label="Race information topics">
            <h2>Find what you need</h2>
            {RACE_SECTIONS.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a>)}
            <p>Choose a topic, then open it to read the details.</p>
          </nav>
          <div className={styles.raceSections}>
          {RACE_SECTIONS.map(section => (
            <details key={section.id} id={section.id} open={section.id === 'overview'} className="scroll-mt-20 rounded-card bg-white shadow-card">
              <summary className="cursor-pointer rounded-card px-5 py-4 font-serif text-[18px] font-bold text-navy marker:text-bronze">
                {section.title}
              </summary>
              <div className="space-y-4 px-5 pb-5 font-sans text-body-sm leading-relaxed text-ink-muted">
                <p>{section.description}</p>

                {section.content === 'categories' && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {RACE_REGISTRATION.categories.map(category => (
                      <section key={category.slug} className="min-w-0 rounded-card border border-sand-dark p-4">
                        <h2 className="font-serif text-[17px] font-bold text-navy">{category.name}</h2>
                        <dl className="mt-3 space-y-2">
                          {Object.entries(category.distances).map(([discipline, distance]) => (
                            <div key={discipline} className="flex flex-wrap justify-between gap-x-3">
                              <dt className="capitalize">{discipline}</dt>
                              <dd className="font-num font-bold text-navy">{distance}</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-3 font-num font-bold text-navy">{formatTSh(category.price)}</p>
                        <p className="text-caption">{category.slug === 'relay' ? 'Per relay participant' : 'Per participant'} · before processing fee</p>
                      </section>
                    ))}
                  </div>
                )}

                {section.content === 'waves' && (
                  <dl className="grid gap-3 sm:grid-cols-3">
                    {RACE_REGISTRATION.categories.map(category => (
                      <div key={category.slug} className="rounded-card border border-sand-dark p-4">
                        <dt className="font-bold text-navy">{category.name} start</dt>
                        <dd>TBD</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {section.content === 'registration' && (
                  <>
                    <p>The current checkout adds a {(RACE_REGISTRATION.processingFeeRate * 100).toFixed(1)}% processing fee. Review the total before payment.</p>
                    {ACTIVE_LIFECYCLE.registration.state === 'open' ? (
                      <Link href="/register" className="inline-flex min-h-11 items-center justify-center rounded-button bg-coral px-5 py-3 font-bold text-white hover:bg-coral-dark">Register</Link>
                    ) : (
                      <div role="status" className="rounded-button border border-sand-dark bg-sand px-5 py-3">
                        <p className="font-bold text-navy">Registration {ACTIVE_LIFECYCLE.registration.state}</p>
                        <p className="mt-1 text-caption">{ACTIVE_LIFECYCLE.registration.explanation}</p>
                      </div>
                    )}
                    <p>Already registered? <Link href="/ticket" className="font-semibold text-navy underline underline-offset-4">View your ticket</Link> (sign-in required).</p>
                  </>
                )}

                {section.facts.length > 0 && (
                  <dl className="divide-y divide-sand-dark">
                    {section.facts.map(fact => (
                      <div key={fact.label} className="grid gap-1 py-3 sm:grid-cols-2 sm:gap-4">
                        <dt className="font-semibold text-navy">{fact.label}</dt>
                        <dd className="min-w-0 break-words">{fact.value ?? 'TBD'}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {section.content === 'faq' && (
                  <dl className="space-y-5">
                    {RACE_FAQS.map(faq => (
                      <div key={faq.question}>
                        <dt className="font-semibold text-navy">{faq.question}</dt>
                        <dd className="mt-1">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {section.content === 'guide' && (
                  RACE_GUIDE.file ? (
                    <a href={RACE_GUIDE.file.href} download className="inline-flex min-h-11 items-center rounded-button bg-navy px-5 py-3 font-bold text-white">
                      Download race guide (PDF)
                    </a>
                  ) : (
                    <div>
                      <button type="button" disabled aria-describedby="guide-unavailable" className="min-h-11 cursor-not-allowed rounded-button bg-sand-dark px-5 py-3 font-bold text-ink-muted">
                        Download race guide (PDF)
                      </button>
                      <p id="guide-unavailable" className="mt-2">{RACE_GUIDE.unavailableReason}</p>
                    </div>
                  )
                )}
              </div>
            </details>
          ))}
          </div>
        </div>
      </div>
    </PublicPage>
  )
}
