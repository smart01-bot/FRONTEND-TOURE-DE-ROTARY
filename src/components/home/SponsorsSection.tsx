import Image from 'next/image'
import { SectionHeading, SponsorSurface, StatusIndicator } from '@/components/visual-system'
import styles from './landing.module.css'

// Frontend publication shape only: not a database/API contract. No records are
// approved at this baseline. Add a record only with rights and source review.
export type LandingSponsor = {
  id: string
  name: string
  tier: 'headline' | 'major' | 'supporting'
  logo: { src: string; width: number; height: number; rights: string }
  source: string
  reviewedOn: string
}
const APPROVED_SPONSORS: readonly LandingSponsor[] = []
const TIERS = [
  { id: 'headline', label: 'Headline sponsors' },
  { id: 'major', label: 'Major partners' },
  { id: 'supporting', label: 'Supporting partners' },
] as const

export default function SponsorsSection({ records = APPROVED_SPONSORS }: { records?: readonly LandingSponsor[] }) {
  return <section id="sponsors" className={styles.section} aria-labelledby="sponsors-title">
    <SectionHeading id="sponsors-title" eyebrow="06 / Together, for Dar" title="Partners in purpose.">
      <p>Recognising the organisations that support the event, with approved names and logos.</p>
    </SectionHeading>
    {records.length === 0 && <div className={styles.actions}><StatusIndicator>Sponsor information not yet published</StatusIndicator></div>}
    <div className={styles.sponsorGroups}>
      {TIERS.map(tier => {
        const sponsors = records.filter(record => record.tier === tier.id)
        return <div className={styles.sponsorGroup} key={tier.id}>
          <h3>{tier.label}</h3>
          {sponsors.length ? <div className={styles.sponsorLogos}>{sponsors.map(sponsor => <SponsorSurface key={sponsor.id} name={sponsor.name} tier={tier.label} logo={<Image src={sponsor.logo.src} alt={`${sponsor.name} logo`} width={sponsor.logo.width} height={sponsor.logo.height} sizes="(min-width: 768px) 30vw, 90vw" />} />)}</div> : <p className={styles.sponsorEmpty}>Approved partner details are unavailable.</p>}
        </div>
      })}
    </div>
  </section>
}
