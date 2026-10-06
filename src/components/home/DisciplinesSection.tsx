'use client'

import { useState } from 'react'
import Image from 'next/image'
import { DISCIPLINES } from '@/config/categories'
import { COURSE_MAP_MARKERS, COURSE_ROUTES, COURSE_SEQUENCE, getCourseMapLayer } from '@/config/course-map'
import { DisciplineLabel, RoutePanel, SectionHeading, StatusIndicator, VisualLink } from '@/components/visual-system'
import type { DisciplineSlug } from '@/types'
import { LANDING_MEDIA } from './landing-media'
import styles from './landing.module.css'

export default function DisciplinesSection() {
  const [selected, setSelected] = useState<DisciplineSlug>('swim')
  const [preview, setPreview] = useState<DisciplineSlug | null>(null)
  const active = preview ?? selected
  const discipline = DISCIPLINES.find(item => item.slug === active)!
  const layer = getCourseMapLayer(active)
  const routes = COURSE_ROUTES.filter(route => route.views.includes(active))
  const markers = COURSE_MAP_MARKERS.filter(marker => marker.views.includes(active))
  const hasMapData = routes.length > 0 || markers.length > 0
  return <section id="race" className={styles.section} aria-labelledby="disciplines-title">
    <SectionHeading id="disciplines-title" eyebrow="01 / Find your rhythm" title="One race. Three disciplines.">
      <p>Explore SWIM, BIKE and RUN. Select a discipline to see its configured distances and course information.</p>
    </SectionHeading>
    <div className={styles.disciplineGrid} onPointerLeave={() => setPreview(null)} role="group" aria-label="Explore a discipline">
      {DISCIPLINES.map((item, index) => <button
        key={item.slug} type="button" data-discipline={item.slug} data-active={active === item.slug}
        aria-pressed={selected === item.slug} aria-controls="discipline-detail"
        className={styles.disciplineCard}
        onClick={() => { setSelected(item.slug); setPreview(null) }}
        onFocus={() => { setSelected(item.slug); setPreview(null) }}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setPreview(item.slug) }}
      >
        <Image src={LANDING_MEDIA[item.slug].src} alt="" fill sizes="(min-width: 1280px) 400px, 33vw" className={styles.photo} />
        <span className={styles.cardShade} aria-hidden />
        <span className={styles.cardIndex} aria-hidden>0{index + 1}</span>
        <span className={styles.disciplineTitle}>{item.name}</span>
        <span className={styles.cardAction}>Explore <span aria-hidden>↗</span></span>
      </button>)}
    </div>
    <p className={styles.credit}>Illustrative sport photography · Jim De Ramos, Daejeung &amp; Olly / Pexels. These images do not depict the official course.</p>
    <div id="discipline-detail" className={styles.courseGrid}>
      <div className={styles.distancePanel}>
        <DisciplineLabel discipline={active} />
        <h3 className={styles.editorialTitle}>Find your distance.</h3>
        <dl className={styles.distances}>
          <div><dt>Sprint</dt><dd>{discipline.distances.sprint}</dd></div>
          <div><dt>Olympic</dt><dd>{discipline.distances.olympic}</dd></div>
        </dl>
        <p className={styles.small}>Registration configuration. Official course distances and instructions await organiser confirmation.</p>
        <VisualLink href={`/race-info#${active}`} variant="quiet">{discipline.name} race information</VisualLink>
      </div>
      <RoutePanel title={`${layer.label} course`} status={<StatusIndicator>{hasMapData ? 'Published course records' : 'Awaiting publication'}</StatusIndicator>}>
        <p>{layer.description}</p>
        {hasMapData ? <ul className={styles.recordList}>
          {routes.map(route => <li key={route.id}><strong>{route.name}</strong> — {route.description}<small>Source: {route.source} · reviewed {route.reviewedOn}</small></li>)}
          {markers.map(marker => <li key={marker.id}><strong>{marker.name}</strong> — {marker.description}<small>Source: {marker.source} · reviewed {marker.reviewedOn}</small></li>)}
        </ul> : <p className={styles.notice}>{layer.unavailableReason}</p>}
        <p className={styles.small}>{layer.relatedTransitions.join(' · ')}</p>
        <div className={styles.actions}><VisualLink href="/course-map">Open course map <span aria-hidden>↗</span></VisualLink></div>
      </RoutePanel>
    </div>
    <ol className={styles.sequence} aria-label="Discipline and transition sequence">{COURSE_SEQUENCE.map(step => <li key={step.label}>{step.label}</li>)}</ol>
  </section>
}
