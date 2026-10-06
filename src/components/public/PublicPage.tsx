import type { ReactNode } from 'react'
import Link from 'next/link'
import HomeNav from '@/components/home/HomeNav'
import HomeFooter from '@/components/home/HomeFooter'
import { VisualSurface } from '@/components/visual-system'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'
import styles from './public.module.css'

const LINKS = [
  ['Race information', '/race-info'], ['Course map', '/course-map'],
  ['Stories', '/stories'], ['Sponsors', '/#sponsors'], ['Edition', '/archive'],
] as const

/** Public presentation only. Existing auth navigation and lifecycle own actions. */
export default function PublicPage({ current, eyebrow, title, description, children, action, accent = 'blue' }: {
  current: string; eyebrow: string; title: string; description: ReactNode;
  children: ReactNode; action?: ReactNode; accent?: 'blue' | 'magenta'
}) {
  return <VisualSurface mode="public" className={styles.publicPage}>
    <HomeNav />
    <nav className={styles.exploreNav} aria-label="Explore Tour de Dar">
      {LINKS.map(([label, href]) => <Link key={href} href={href} aria-current={current === href ? 'page' : undefined}>{label}</Link>)}
    </nav>
    <main id="main-content" tabIndex={-1}>
      <header className={styles.hero} data-accent={accent}>
        <div className={styles.heroInner}>
          <div><p className={styles.eyebrow}>{eyebrow}</p><h1>{title}</h1><div className={styles.heroDescription}>{description}</div>{action && <div className={styles.actions}>{action}</div>}</div>
          <div className={styles.heroRail}>
            <span>{ACTIVE_LIFECYCLE.editionLabel ?? 'Event edition'}</span>
            <strong>SWIM<br />BIKE<br />RUN<span aria-hidden="true"> ↗</span></strong>
            <span>{ACTIVE_LIFECYCLE.label}</span>
          </div>
        </div>
      </header>
      {children}
    </main>
    <nav className={styles.utilityNav} aria-label="Community and privacy">
      <Link href="/community-guidelines" aria-current={current === '/community-guidelines' ? 'page' : undefined}>Community guidelines</Link>
      <Link href="/privacy" aria-current={current === '/privacy' ? 'page' : undefined}>Privacy &amp; data rights</Link>
      <Link href="/">Back to Tour de Dar</Link>
    </nav>
    <HomeFooter />
  </VisualSurface>
}
