'use client'

import { useState } from 'react'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'
import { RACE_SECTIONS } from '@/config/race-info'
import { PHOTO_ALBUMS, PUBLISHED_RESULTS } from '@/config/race-day'
import { SectionHeading, StatusIndicator, VisualLink } from '@/components/visual-system'
import styles from './landing.module.css'

type BrowseView = 'before' | 'race' | 'after'
const VIEWS: { id: BrowseView; label: string }[] = [
  { id: 'before', label: 'Before' }, { id: 'race', label: 'Race Day' }, { id: 'after', label: 'After' },
]

/** Local browsing only. Never writes lifecycle configuration or enables an action. */
export default function EventWeekend() {
  const [view, setView] = useState<BrowseView>('before')
  const section = RACE_SECTIONS.find(item => item.id === (view === 'before' ? 'registration' : 'schedule'))
  return <section className={styles.weekend} aria-labelledby="weekend-title">
    <div className={styles.section}>
      <SectionHeading id="weekend-title" eyebrow="05 / Before. During. Beyond." title="More than race day.">
        <p>Explore preparation, race-day information and memories. Times and locations appear here only when confirmed.</p>
      </SectionHeading>
      <StatusIndicator>Current event status: {ACTIVE_LIFECYCLE.label}</StatusIndicator>
      <div className={styles.viewButtons} role="group" aria-label="Browse the event journey">
        {VIEWS.map(item => <button key={item.id} type="button" className={styles.viewButton} aria-pressed={view === item.id} aria-controls="weekend-panel" onClick={() => setView(item.id)}>{item.label}</button>)}
      </div>
      <div id="weekend-panel" className={styles.weekendPanel} aria-live="polite" aria-atomic="true">
        <h3 className={styles.editorialTitle}>{view === 'before' ? 'Make space for the start.' : view === 'race' ? 'Know before you go.' : 'Keep the memory.'}</h3>
        {view === 'after' ? <>
          <p>Participant stories and private memory cards connect the experience beyond race day.</p>
          <dl className={styles.factList}>
            <div><dt>Results</dt><dd>{PUBLISHED_RESULTS.length ? 'Published results available in the participant portal' : 'Awaiting verified timing records'}</dd></div>
            <div><dt>Event photographs</dt><dd>{PHOTO_ALBUMS.length ? 'Published albums available in the participant portal' : 'Awaiting approved albums and consent'}</dd></div>
          </dl>
          <div className={styles.actions}><VisualLink href="/stories">Read stories</VisualLink><VisualLink href="/results/memories" variant="secondary">Your memories · sign-in required</VisualLink><VisualLink href="/archive" variant="quiet">Explore this edition</VisualLink></div>
        </> : <>
          <p>{view === 'before' ? 'Check entry information, equipment and preparation details before making your race-day plans.' : section?.description}</p>
          <dl className={styles.factList}>{section?.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value ?? 'TBD'}</dd>{fact.value !== null && <p className={styles.small}>Source: {fact.source} · reviewed {fact.reviewedOn}</p>}</div>)}</dl>
          <div className={styles.actions}>
            <VisualLink href={view === 'before' ? '/race-info#registration' : '/race-info#schedule'}>{view === 'before' ? 'Plan your participation' : 'Read race-day information'}</VisualLink>
            <VisualLink href={view === 'before' ? '/race-info#equipment' : '/course-map'} variant="secondary">{view === 'before' ? 'Equipment information' : 'Open course map'}</VisualLink>
          </div>
        </>}
      </div>
      <p className={styles.small}>These views are for browsing. Registration and community actions follow the current event status.</p>
    </div>
  </section>
}
