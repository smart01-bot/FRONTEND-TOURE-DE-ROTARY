'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFeaturedStory } from '@/lib/supabase/stories'
import { CATEGORY_MAP, DISCIPLINE_MAP } from '@/config/categories'
import { initials, truncate } from '@/lib/utils'
import { SITE } from '@/config/site'
import type { PublicStory } from '@/lib/supabase/stories'

// SVG noise data URI for archival grain — opacity controlled inline
const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export default function WhyIRaceSection() {
  const [story, setStory] = useState<PublicStory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    getFeaturedStory().then(value => { if (active) setStory(value) }).catch(() => { if (active) setError(true) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const category = story ? CATEGORY_MAP[story.category] : null
  const discipline = story?.discipline ? DISCIPLINE_MAP[story.discipline] : null
  return (
    <section className="bg-parchment relative overflow-hidden px-5 py-11">

      {/* Archival grain overlay — 0.07 opacity per spec */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRAIN_URL, opacity: 0.07 }}
      />

      {/* Section label — Montserrat */}
      <p className="relative font-sans text-[10px] font-bold text-bronze-700 uppercase tracking-[.07em] mb-5">
        Participant stories
      </p>

      {/* Pull quote — Playfair italic */}
      {loading ? <div className="relative mb-6 h-24 animate-pulse rounded-card bg-white/40" /> : error ? (
        <div className="relative mb-6 rounded-card border border-bronze/20 bg-white/35 p-5"><p className="font-sans text-[12px] text-ink-muted">Participant stories are unavailable right now.</p></div>
      ) : story ? (
        <blockquote className="relative font-serif text-section font-bold italic text-navy leading-[1.42] tracking-tight mb-6">&ldquo;{truncate(story.story, 180)}&rdquo;</blockquote>
      ) : (
        <div className="relative mb-6 rounded-card border border-bronze/20 bg-white/35 p-5">
          <p className="font-serif text-[19px] font-bold text-navy">No public stories yet.</p>
          <p className="mt-2 font-sans text-[12px] leading-relaxed text-ink-subtle">Be the first participant to share why you are doing this.</p>
        </div>
      )}

      {/* Attribution */}
      {story && <div className="relative flex items-center gap-2.5 mb-6">
        {/* Avatar — navy circle, serif initial in bronze */}
        <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-[13px] font-bold text-bronze">{initials(story.full_name)[0] ?? '?'}</span>
        </div>
        <div>
          <div className="font-sans text-[13px] font-bold text-navy leading-none mb-1">
            {story.full_name}
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="font-sans text-[10px] font-bold px-1.5 py-0.5 rounded-pill"
              style={{ background: discipline?.hex ?? '#C8953C', color: '#0D1B3D' }}
            >
              {discipline ? `${category?.name ?? story.category} · ${discipline.name}` : category?.name ?? story.category}
            </span>
            <span className="font-sans text-[11px] text-ink-subtle">{SITE.event.location}</span>
          </div>
        </div>
      </div>}

      <Link
        href="/stories"
        className="relative font-sans text-[11px] font-bold text-bronze uppercase tracking-[.04em] hover:text-navy transition-colors duration-200"
      >
        Read more stories →
      </Link>

    </section>
  )
}
