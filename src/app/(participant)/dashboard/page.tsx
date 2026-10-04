'use client'

import Link from 'next/link'
import { ArrowUpRight, Heart, Ticket, Users, Bike, UserRound, Trophy } from 'lucide-react'
import { useParticipant } from '@/hooks/useParticipant'
import { useFundraising } from '@/hooks/useFundraising'
import { CATEGORY_MAP } from '@/config/categories'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'
import { RACE_SECTIONS } from '@/config/race-info'
import { DisciplineLabel, StatusIndicator, VisualCard, VisualLink } from '@/components/visual-system'
import styles from '@/components/participant/dashboard.module.css'

const actions = [
  { href: '/ticket', label: 'Your ticket', description: 'Registration, bib and QR readiness', icon: Ticket },
  { href: '/training', label: 'Prepare', description: 'Training and discipline resources', icon: Bike },
  { href: '/feed', label: 'Connect', description: 'Updates from your community', icon: Users },
  { href: '/results', label: 'Race & remember', description: 'Results, photos and private memories', icon: Trophy },
]

export default function DashboardPage() {
  const { profile, registration, loading } = useParticipant()
  const { campaign, loading: fundraisingLoading } = useFundraising()
  if (loading) return <div className={styles.page} role="status">Loading your participant dashboard…</div>

  const category = registration?.category ? CATEGORY_MAP[registration.category] : null
  const ready = Boolean(registration?.payment_status === 'paid' && registration.status === 'confirmed' && registration.bib_number)
  const date = RACE_SECTIONS.find(section => section.id === 'overview')?.facts.find(fact => fact.label === 'Confirmed event date')?.value
  const progress = campaign ? Math.min(100, Math.round(campaign.total_raised / Math.max(campaign.goal, 1) * 100)) : 0

  return <div className={styles.page}>
    <header className={styles.hero}>
      <div>
        <p className={styles.eyebrow}>Your Tour de Dar</p>
        <h1>Make it<br /><span>your journey.</span></h1>
        <p className={styles.welcome}>Welcome, {profile?.full_name || 'participant'}.</p>
        <div className={styles.disciplines}><DisciplineLabel discipline="swim" /><DisciplineLabel discipline="bike" /><DisciplineLabel discipline="run" /></div>
      </div>
      <div className={styles.identity}>
        <p className={styles.eyebrow}>{ACTIVE_LIFECYCLE.label}</p>
        <p className={styles.category}>{category?.name ?? 'Your participant space'}</p>
        <p>Race date: <strong>{date ?? 'TBD'}</strong></p>
        {!date && <p>The countdown will be available after the event date is confirmed.</p>}
        <VisualLink href="/race-info" variant="secondary">Event information <ArrowUpRight size={16} /></VisualLink>
      </div>
    </header>

    <section className={styles.statuses} aria-label="Your current status">
      <VisualCard><p className={styles.eyebrow}>Registration</p><h2>{registration ? registration.status : 'Not available'}</h2><p>{registration ? 'Your current registration record.' : 'No registration record is available. Account creation alone does not confirm race entry.'}</p></VisualCard>
      <VisualCard><p className={styles.eyebrow}>Payment</p><h2>{registration?.payment_status ?? 'Not available'}</h2><p>Payment status is separate from your race result.</p></VisualCard>
      <VisualCard><p className={styles.eyebrow}>Your bib</p><h2 className={styles.bib}>{registration?.bib_number ? `#${registration.bib_number}` : 'Not assigned'}</h2><StatusIndicator tone={ready ? 'success' : 'neutral'}>{ready ? 'Ticket ready' : 'Ticket not ready'}</StatusIndicator><Link href="/ticket">View ticket and requirements →</Link></VisualCard>
    </section>

    <section className={styles.next} aria-labelledby="next-actions"><div><p className={styles.eyebrow}>One step at a time</p><h2 id="next-actions">Your next move</h2></div><div className={styles.actions}>{actions.map(({ href, label, description, icon: Icon })=><Link key={href} href={href}><Icon size={24} aria-hidden /><h3>{label}</h3><p>{description}</p><ArrowUpRight size={18} aria-hidden /></Link>)}</div></section>

    <div className={styles.columns}>
      <VisualCard><div className={styles.row}><Heart aria-hidden /><h2>Move for a cause</h2></div>
        {fundraisingLoading ? <p role="status">Loading your fundraising…</p> : campaign ? <><p className={styles.amount}>TSh {campaign.total_raised.toLocaleString()}</p><p>of TSh {campaign.goal.toLocaleString()} · {campaign.supporter_count} supporters</p><progress max={100} value={progress} aria-label="Fundraising goal progress" /><p>{progress}% of your goal</p></> : <p>Your fundraising information is not available yet.</p>}
        <VisualLink href="/fundraise">Open fundraising <ArrowUpRight size={16} /></VisualLink>
      </VisualCard>
      <VisualCard><p className={styles.eyebrow}>Prepare with confidence</p><h2>Upcoming information</h2><p>Official schedules, start times and assembly instructions are awaiting publication. Check the race guide before making race-day plans.</p><div className={styles.links}><VisualLink href="/course-map" variant="secondary">Course information</VisualLink><VisualLink href="/profile" variant="quiet"><UserRound size={16} /> Your profile</VisualLink></div></VisualCard>
    </div>
  </div>
}
