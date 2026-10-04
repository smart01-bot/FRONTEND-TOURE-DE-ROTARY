import { CATEGORIES, DISCIPLINES } from '@/config/categories'
import styles from './landing.module.css'

export default function StatsStrip() {
  return <section className={styles.factsStrip} aria-label="Event format">
    <p><strong>{String(CATEGORIES.length).padStart(2, '0')}</strong> Configured race options</p>
    <p><strong>{String(DISCIPLINES.length).padStart(2, '0')}</strong> Disciplines</p>
    <p><strong>Dar</strong> One shared purpose</p>
  </section>
}
