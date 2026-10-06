import Link from 'next/link'
import { LockKeyhole, ArrowUpRight } from 'lucide-react'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'
import { PageBody, PageHeader } from './ui'
import styles from './management.module.css'

// Availability presentation, not permissions or a substitute for server capabilities.
const areas = [
  { id: 'approvals', title: 'Participant approvals', action: 'Review applications', reason: 'Application review is not available yet.', detail: 'Approve, reject and request corrections will become available when the review service is connected.', href: '/admin/athletes', link: 'Open current athlete records' },
  { id: 'content', title: 'Event content', action: 'Edit event content', reason: 'Content editing is not available yet.', detail: 'Race information and courses remain read-only here until reviewed publication is available.', href: '/race-info', link: 'View published race information' },
  { id: 'sponsors', title: 'Sponsors & partners', action: 'Manage sponsors', reason: 'Sponsor management is not available yet.', detail: 'No approved sponsor records are connected. Partner details and logos will appear only after review.', href: '/#sponsors', link: 'View public sponsor section' },
  { id: 'moderation', title: 'Community moderation', action: 'Open moderation queue', reason: 'A moderation queue is not available yet.', detail: 'Reports and moderation decisions cannot be submitted from this workspace.', href: '/community-guidelines', link: 'Review community guidelines' },
  { id: 'operations', title: 'Race operations', action: 'Open race controls', reason: 'Operational controls are not available yet.', detail: 'Check-in, notices, timing, results and photo publication remain unavailable. Viewing this panel does not change the event state.', href: '/admin/bibs', link: 'Open existing bib assignment' },
  { id: 'finance', title: 'Payment review', action: 'Open reconciliation', reason: 'Payment reconciliation is not available yet.', detail: 'Existing registration payment actions remain in athlete records. Refunds and settlement controls are unavailable.', href: '/admin/athletes', link: 'Open athlete records' },
  { id: 'staff', title: 'Staff & permissions', action: 'Manage staff access', reason: 'Staff delegation is not available yet.', detail: 'This workspace cannot invite staff, grant privileges or change account roles.' },
  { id: 'audit', title: 'Audit history', action: 'View audit history', reason: 'Administrative history is not connected.', detail: 'No activity log or authorized export is available. An empty history must not be interpreted as no prior changes.' },
]

export function ManagementWorkspace() {
  return <PageBody>
    <PageHeader eyebrow="Event administration" title="Manage the event." subtitle="Current tools and the availability of expanded event management." />
    <section className={styles.summary} aria-label="Management availability"><div><p>Current edition state</p><strong>{ACTIVE_LIFECYCLE.label}</strong></div><div><p>Existing tools</p><strong>Athletes · payment status · bibs</strong></div><div><p>Expanded management</p><strong>Not operational</strong></div></section>
    <nav className={styles.index} aria-label="Management areas">{areas.map(area=><a key={area.id} href={`#${area.id}`}>{area.title}</a>)}</nav>
    <div className={styles.grid}>{areas.map(area=><section className={styles.card} key={area.id} id={area.id} aria-labelledby={`${area.id}-title`}>
      <span className={styles.status}><LockKeyhole size={14} aria-hidden /> Not available</span>
      <h2 id={`${area.id}-title`}>{area.title}</h2><p>{area.detail}</p>
      <button type="button" disabled aria-describedby={`${area.id}-reason`}>{area.action}</button><p id={`${area.id}-reason`} className={styles.reason}>{area.reason}</p>
      {area.href && <Link href={area.href}>{area.link}<ArrowUpRight size={16} aria-hidden /></Link>}
    </section>)}</div>
  </PageBody>
}
