import { SITE } from '@/config/site'
import Link from 'next/link'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'

export default function ImpactSection() {
  return (
    <section
      className="relative overflow-hidden px-5 pt-12 pb-12"
      style={{
        backgroundImage: "linear-gradient(rgba(7,22,48,.82), rgba(7,22,48,.9)), url('/assets/landing/pexels-mikhail-nilov-8542538.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
      }}
    >

      {/* Radial bronze glow — top right */}
      <div
        className="absolute -top-12 -right-12 w-44 h-44 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,149,60,.10) 0%, transparent 70%)' }}
      />

      {/* Section label */}
      <p className="relative font-sans text-[10px] font-bold text-bronze uppercase tracking-[.07em] mb-4">
        Why it matters
      </p>

      {/* Headline — Playfair italic */}
      <h2 className="relative font-serif text-section font-bold italic text-white leading-[1.2] tracking-tight mb-4">
        Every stroke.<br />Every pedal.<br />Every step. Counts.
      </h2>

      {/* Body — Montserrat */}
      <p className="relative font-sans text-body-sm text-white/50 leading-[1.65] mb-7">
        All proceeds go to {SITE.beneficiary.name} — the only public cancer hospital
        in Tanzania. Your entry funds treatment for patients who cannot afford it.
      </p>

      <p className="relative mb-7 rounded-card border border-bronze/15 bg-white/5 px-4 py-3 font-sans text-[11px] leading-relaxed text-white/55">
        Verified fundraising totals and impact figures will appear when they are published by the event team.
      </p>

      {/* CTA */}
      <Link
        href={ACTIVE_LIFECYCLE.registration.state === 'open' ? '/register' : ACTIVE_LIFECYCLE.primaryAction.href}
        className="relative w-full py-4 bg-coral text-white rounded-button
                   font-sans text-body-sm font-bold
                   hover:bg-coral-dark active:scale-[.98] transition-all duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
      >
        {ACTIVE_LIFECYCLE.registration.state === 'open' ? 'Register & change lives' : ACTIVE_LIFECYCLE.primaryAction.label}
      </Link>

    </section>
  )
}
