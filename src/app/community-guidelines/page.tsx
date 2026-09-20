import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ShieldCheck } from 'lucide-react'
import HomeNav from '@/components/home/HomeNav'
import HomeFooter from '@/components/home/HomeFooter'
import { COMMUNITY_GUIDELINES } from '@/config/community'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'Community guidelines',
  description: 'How Tour de Dar participants can keep the event community respectful, safe and useful.',
}
export default function CommunityGuidelinesPage() {
  return (
    <main>
      <HomeNav />

      <section className="bg-navy px-5 pb-8 pt-10">
        <div className="mx-auto max-w-wide">
          <Link href="/feed" className="inline-flex min-h-11 items-center font-sans text-caption text-white/75 underline underline-offset-4">
            Back to the community
          </Link>
          <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/10 text-bronze">
            <ShieldCheck size={21} />
          </div>
          <h1 className="mt-4 font-serif text-headline text-white">
            Community <span className="text-bronze">guidelines.</span>
          </h1>
          <p className="mt-3 max-w-content font-sans text-body-sm leading-relaxed text-white/75">
            The Run-Up exists to help participants prepare, encourage one another and feel part of Tour de Dar.
          </p>
        </div>
      </section>

      <section className="bg-sand px-5 py-7 sm:py-10">
        <div className="mx-auto max-w-wide">
          <div className="grid gap-4 md:grid-cols-2">
            {COMMUNITY_GUIDELINES.map((guideline, index) => (
              <article key={guideline.id} className="rounded-card border border-sand-dark bg-white p-5 shadow-card">
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

      <HomeFooter />
    </main>
  )
}
