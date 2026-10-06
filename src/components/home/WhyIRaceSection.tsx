'use client'

import { useEffect, useState } from 'react'
import { getFeaturedStory } from '@/lib/supabase/stories'
import { CATEGORY_MAP, DISCIPLINE_MAP } from '@/config/categories'
import { initials, truncate } from '@/lib/utils'
import type { PublicStory } from '@/lib/supabase/stories'
import { SectionHeading, VisualLink } from '@/components/visual-system'
import styles from './landing.module.css'

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
  return <section className={styles.stories} aria-labelledby="stories-title">
    <div className={`${styles.section} ${styles.editorialGrid}`}>
      <div>
        <SectionHeading id="stories-title" eyebrow="02 / The people behind the movement" title="Every start has a story.">
          <p>Why are you doing this? Discover the reasons participants choose to share.</p>
        </SectionHeading>
        <VisualLink href="/stories" variant="secondary">Read participant stories <span aria-hidden>↗</span></VisualLink>
      </div>
      <div className={styles.storyPanel} aria-busy={loading}>
        {loading ? <p className={styles.loading} role="status">Loading participant stories…</p> : error ? (
          <div role="status"><h3 className={styles.editorialTitle}>Stories are unavailable right now.</h3><p className={styles.small}>Please try the participant stories page again later.</p></div>
        ) : story ? <>
          <blockquote className={styles.quote}>&ldquo;{truncate(story.story, 260)}&rdquo;</blockquote>
          <div className={styles.identity}>
            <span className={styles.avatar} aria-hidden>{initials(story.full_name)[0] ?? '?'}</span>
            <div><p><strong>{story.full_name}</strong></p><p className={styles.small}>{discipline ? `${category?.name ?? story.category} · ${discipline.name}` : category?.name ?? story.category}</p></div>
          </div>
          <p className={styles.small}>Shared publicly by this participant.</p>
        </> : <div role="status">
          <p className={styles.eyebrow}>Your reason belongs here</p>
          <h3 className={styles.editorialTitle}>No public stories yet.</h3>
          <p className={styles.small}>Participants can choose to share their story from their profile. Public sharing is optional.</p>
        </div>}
      </div>
    </div>
  </section>
}
