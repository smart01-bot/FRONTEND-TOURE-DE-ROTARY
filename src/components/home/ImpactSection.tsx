import Image from 'next/image'
import { SITE } from '@/config/site'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'
import { SectionHeading, StatusIndicator, VisualLink, VisualSurface } from '@/components/visual-system'
import styles from './landing.module.css'

export default function ImpactSection() {
  return <VisualSurface mode="public" tone="dark">
    <section className={`${styles.section} ${styles.impactGrid}`} aria-labelledby="impact-title">
      <div>
        <SectionHeading id="impact-title" eyebrow="04 / Move with purpose" title="Every effort. A bigger reason." />
        <div className={styles.impactCopy}>
          <p>{SITE.name} is a charity triathlon raising funds for {SITE.beneficiary.name}, organised by {SITE.organiser}.</p>
          <div className={styles.actions}><StatusIndicator>Impact figures awaiting publication</StatusIndicator></div>
          <p className={styles.small}>Verified fundraising totals and impact figures will appear when they are published by the event team.</p>
        </div>
        <div className={styles.actions}>
          <VisualLink href={ACTIVE_LIFECYCLE.registration.state === 'open' ? '/register' : ACTIVE_LIFECYCLE.primaryAction.href}>
            {ACTIVE_LIFECYCLE.registration.state === 'open' ? 'Register & support the cause' : ACTIVE_LIFECYCLE.primaryAction.label} <span aria-hidden>↗</span>
          </VisualLink>
        </div>
      </div>
      <figure>
        <div className={styles.impactImage}><Image src="/assets/landing/pexels-mikhail-nilov-8542538.jpg" alt="Hands reaching towards a small globe" fill sizes="(min-width: 768px) 45vw, 100vw" className={styles.photo} /></div>
        <figcaption className={styles.impactCaption}>Illustrative photography · Mikhail Nilov / Pexels. Not a record of funded treatment or event impact.</figcaption>
      </figure>
    </section>
  </VisualSurface>
}
