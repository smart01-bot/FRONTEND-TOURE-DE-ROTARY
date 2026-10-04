import HomeNav           from '@/components/home/HomeNav'
import HeroSection       from '@/components/home/HeroSection'
import StatsStrip        from '@/components/home/StatsStrip'
import DisciplinesSection from '@/components/home/DisciplinesSection'
import WhyIRaceSection   from '@/components/home/WhyIRaceSection'
import CommunityPulse    from '@/components/home/CommunityPulse'
import ImpactSection     from '@/components/home/ImpactSection'
import EventWeekend from '@/components/home/EventWeekend'
import SponsorsSection from '@/components/home/SponsorsSection'
import { VisualSurface } from '@/components/visual-system'
import styles from '@/components/home/landing.module.css'
import HomeFooter        from '@/components/home/HomeFooter'

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <VisualSurface mode="public" className={styles.landing}>
        <HomeNav />
        <HeroSection />
        <StatsStrip />
        <DisciplinesSection />
        <WhyIRaceSection />
        <CommunityPulse />
        <ImpactSection />
        <EventWeekend />
        <SponsorsSection />
        <HomeFooter />
      </VisualSurface>
    </main>
  )
}
