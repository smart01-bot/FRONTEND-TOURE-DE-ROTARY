import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera, Mail, MessageCircle, ShieldCheck, UserRound, FlaskConical } from 'lucide-react'
import HomeNav from '@/components/home/HomeNav'
import HomeFooter from '@/components/home/HomeFooter'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'Privacy and data rights',
  description: 'How Tour de Dar uses participant information, consent boundaries, and how to request access or deletion.',
}

const sections = [
  {
    title: 'Operational event data',
    icon: ShieldCheck,
    text: 'Account, registration, category, contact, payment-status and bib information may be used to operate the event and participant portal. Registering does not make your full participant record public.',
  },
  {
    title: 'Public profile and story consent',
    icon: UserRound,
    text: 'Your story appears on the public stories page only when you choose the existing public-story setting. That choice does not publish your phone, email, activity, photo, bib or a broader public profile.',
  },
  {
    title: 'Stories and photographs',
    icon: Camera,
    text: 'Story consent and photo consent are separate. No event-photo upload, Find Me association or public-photo consent workflow is currently connected, so the frontend does not claim that you approved one.',
  },
  {
    title: 'Research consent',
    icon: FlaskConical,
    text: 'Research use is separate from information needed to operate the event. No research-consent collection or research-data workflow is currently implemented in this frontend.',
  },
  {
    title: 'Communication preferences',
    icon: MessageCircle,
    text: 'A self-service preference centre and notification-delivery contract are not yet available. No preference change is recorded from this page.',
  },
]

export default function PrivacyPage() {
  const accessHref = `mailto:${SITE.contact.email}?subject=${encodeURIComponent('Tour de Dar data access request')}`
  const deletionHref = `mailto:${SITE.contact.email}?subject=${encodeURIComponent('Tour de Dar account deletion request')}`

  return (
    <main id="main-content" tabIndex={-1}>
      <HomeNav />
      <section className="bg-navy px-5 pb-8 pt-10">
        <div className="mx-auto max-w-wide">
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white/10 text-bronze" aria-hidden="true">
            <ShieldCheck size={21} />
          </div>
          <h1 className="mt-4 font-serif text-headline text-white">
            Privacy &amp; <span className="text-bronze">data rights.</span>
          </h1>
          <p className="mt-3 max-w-content font-sans text-body-sm leading-relaxed text-white/75">
            Clear boundaries for participant information, public stories, photographs, research and requests.
          </p>
        </div>
      </section>

      <section className="bg-sand px-5 py-7 sm:py-10" aria-labelledby="privacy-boundaries">
        <div className="mx-auto max-w-wide">
          <h2 id="privacy-boundaries" className="sr-only">Privacy and consent boundaries</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {sections.map(({ title, icon: Icon, text }) => (
              <article key={title} className="rounded-card border border-sand-dark bg-white p-5 shadow-card">
                <Icon size={18} className="text-bronze-700" aria-hidden="true" />
                <h3 className="mt-3 font-serif text-[19px] font-bold text-navy">{title}</h3>
                <p className="mt-2 font-sans text-body-sm leading-6 text-ink-muted">{text}</p>
              </article>
            ))}
          </div>

          <section className="mt-5 rounded-card border border-sand-dark bg-white p-5 shadow-card" aria-labelledby="data-requests">
            <h2 id="data-requests" className="font-serif text-[20px] font-bold text-navy">Access or deletion requests</h2>
            <p className="mt-2 max-w-content font-sans text-body-sm leading-6 text-ink-muted">
              The portal does not yet have an automated request tracker. These links open your email app; a request is not submitted until you send the message, and the website will not show a false confirmation.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={accessHref} className="inline-flex min-h-11 items-center gap-2 rounded-button bg-navy px-5 py-3 font-sans text-body-sm font-bold text-white">
                <Mail size={16} aria-hidden="true" /> Request my data
              </a>
              <a href={deletionHref} className="inline-flex min-h-11 items-center gap-2 rounded-button border border-navy/20 px-5 py-3 font-sans text-body-sm font-bold text-navy">
                <Mail size={16} aria-hidden="true" /> Request account deletion
              </a>
            </div>
            <p className="mt-4 font-sans text-caption leading-5 text-ink-subtle">
              If no email app opens, contact <a href={`mailto:${SITE.contact.email}`} className="font-bold text-navy underline underline-offset-4">{SITE.contact.email}</a>. Identity verification and response timing are organiser processes and are not represented as completed here.
            </p>
          </section>

          <p className="mt-5 font-sans text-caption text-ink-subtle">
            Signed in? You can review your current public-story choice on your <Link href="/profile" className="font-bold text-navy underline underline-offset-4">participant profile</Link>.
          </p>
        </div>
      </section>
      <HomeFooter />
    </main>
  )
}
