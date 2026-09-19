import type { Metadata } from 'next'
import Link from 'next/link'
import HomeNav from '@/components/home/HomeNav'
import HomeFooter from '@/components/home/HomeFooter'
import { RACE_FAQS, RACE_GUIDE, RACE_REGISTRATION, RACE_SECTIONS } from '@/config/race-info'
import { formatTSh } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Race information',
  description: 'Categories, registration, courses, transitions and race-day information for Tour de Dar. Unconfirmed details are marked TBD.',
}

export default function RaceInfoPage() {
  return (
    <main>
      <HomeNav />
      <section className="bg-navy px-5 pt-10 pb-8">
        <div className="mx-auto max-w-wide">
          <Link href="/" className="inline-flex min-h-11 items-center font-sans text-caption text-white/75 underline underline-offset-4">
            Back to home
          </Link>
          <h1 className="mt-3 font-serif text-headline text-white">
            Race <span className="text-bronze">information.</span>
          </h1>
          <p className="mt-3 max-w-content font-sans text-body-sm leading-relaxed text-white/75">
            Find your category, prepare for each discipline and check race-day arrangements.
            Open a section below. Unconfirmed details are marked TBD.
          </p>
        </div>
      </section>

      <div className="bg-sand px-5 py-6">
        <div className="mx-auto max-w-wide space-y-3">
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
                    <Link href="/register" className="inline-flex min-h-11 items-center justify-center rounded-button bg-coral px-5 py-3 font-bold text-white hover:bg-coral-dark">
                      Register
                    </Link>
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
      <HomeFooter />
    </main>
  )
}
