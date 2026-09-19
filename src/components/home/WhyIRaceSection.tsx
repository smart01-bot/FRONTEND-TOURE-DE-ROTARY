'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getFeaturedStory } from '@/lib/supabase/stories'
import { CATEGORY_MAP, DISCIPLINE_MAP } from '@/config/categories'
import { initials, truncate } from '@/lib/utils'
import { SITE } from '@/config/site'

// Shown until a live public story loads — and if none exist yet.
const PLACEHOLDER = {
  text:     "I race for my mother. She was treated at Ocean Road. She's still here. So am I.",
  author:   'Amina Rashid',
  initial:  'A',
  category: 'Sprint',
  location: SITE.event.location,
  badgeColor: '#4FC3F7',
}

// SVG noise data URI for archival grain — opacity controlled inline
const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export default function WhyIRaceSection() {
  const [quote, setQuote] = useState(PLACEHOLDER)

  useEffect(() => {
    let active = true
    getFeaturedStory().then(story => {
      if (!active || !story) return
      const category   = CATEGORY_MAP[story.category]
      const discipline  = story.discipline ? DISCIPLINE_MAP[story.discipline] : null
      setQuote({
        text:       truncate(story.story, 180),
        author:     story.full_name,
        initial:    initials(story.full_name)[0] ?? '?',
        category:   discipline ? `${category?.name ?? story.category} · ${discipline.name}` : category?.name ?? story.category,
        location:   SITE.event.location,
        badgeColor: discipline?.hex ?? '#C8953C',
      })
    })
    return () => { active = false }
  }, [])

  const q = quote
  return (
    <section className="bg-parchment relative overflow-hidden px-5 py-11">

      {/* Archival grain overlay — 0.07 opacity per spec */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRAIN_URL, opacity: 0.07 }}
      />

      {/* Section label — Montserrat */}
      <p className="relative font-sans text-[10px] font-bold text-bronze-700 uppercase tracking-[.07em] mb-5">
        Why I race
      </p>

      {/* Pull quote — Playfair italic */}
      <blockquote className="relative font-serif text-section font-bold italic text-navy leading-[1.42] tracking-tight mb-6">
        &ldquo;{q.text}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="relative flex items-center gap-2.5 mb-6">
        {/* Avatar — navy circle, serif initial in bronze */}
        <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-[13px] font-bold text-bronze">{q.initial}</span>
        </div>
        <div>
          <div className="font-sans text-[13px] font-bold text-navy leading-none mb-1">
            {q.author}
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="font-sans text-[10px] font-bold px-1.5 py-0.5 rounded-pill"
              style={{ background: q.badgeColor, color: '#0D1B3D' }}
            >
              {q.category}
            </span>
            <span className="font-sans text-[11px] text-ink-subtle">{q.location}</span>
          </div>
        </div>
      </div>

      <Link
        href="/stories"
        className="relative font-sans text-[11px] font-bold text-bronze uppercase tracking-[.04em] hover:text-navy transition-colors duration-200"
      >
        Read more stories →
      </Link>

    </section>
  )
}
