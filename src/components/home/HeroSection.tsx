import Image from 'next/image'
import { SITE } from '@/config/site'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'
import { RACE_SECTIONS } from '@/config/race-info'
import { DisciplineLabel, StatusIndicator, VisualLink, VisualSurface } from '@/components/visual-system'
import { LANDING_MEDIA } from './landing-media'
import styles from './landing.module.css'

export default function HeroSection() {
  const confirmedDate = RACE_SECTIONS.find(section => section.id === 'overview')?.facts.find(fact => fact.label === 'Confirmed event date')
  return (
    <VisualSurface mode="public" tone="dark">
      <section className={styles.hero} aria-labelledby="landing-title">
        <div className={styles.heroCopy}>
          <div className={styles.meta}>
            <span>{ACTIVE_LIFECYCLE.editionLabel ?? SITE.name}</span>
            <StatusIndicator>{ACTIVE_LIFECYCLE.registration.state === 'open' ? 'Registration open' : ACTIVE_LIFECYCLE.label}</StatusIndicator>
          </div>
          <p className={styles.eyebrow}>{SITE.event.location}</p>
          <h1 id="landing-title" className={styles.heroTitle}>THE CITY<br />MOVES<span className={styles.yellow}>.</span></h1>
          <p className={styles.heroSerif}>For a reason.</p>
          <p className={styles.heroDescription}>{SITE.description}</p>
          <div className={styles.actions}>
            <VisualLink href={ACTIVE_LIFECYCLE.primaryAction.href}>{ACTIVE_LIFECYCLE.primaryAction.label} <span aria-hidden>↗</span></VisualLink>
            <VisualLink href="/race-info" variant="secondary">Learn about the race</VisualLink>
          </div>
          <p className={styles.small}>Confirmed event date: {confirmedDate?.value ?? 'TBD'}. See race information for organiser updates.</p>
        </div>
        <figure className={styles.heroFigure}>
          <div className={styles.heroPhoto}>
            <Image src={LANDING_MEDIA.swim.src} alt={LANDING_MEDIA.swim.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className={styles.photo} />
            <div className={styles.photoStamp} aria-hidden>SWIM.<br />BIKE.<br />RUN.</div>
          </div>
          <figcaption className={styles.photoCaption}>Sport, community, purpose. Illustrative photography · {LANDING_MEDIA.swim.credit} / Pexels.</figcaption>
        </figure>
        <div className={styles.heroFoot}>
          <span>Organised by {SITE.organiser}</span>
          <div className={styles.disciplineLabels}><DisciplineLabel discipline="swim" /><DisciplineLabel discipline="bike" /><DisciplineLabel discipline="run" /></div>
          <a href="#race" className={styles.textLink}>Explore the disciplines <span aria-hidden>↓</span></a>
        </div>
      </section>
    </VisualSurface>
  )
}
