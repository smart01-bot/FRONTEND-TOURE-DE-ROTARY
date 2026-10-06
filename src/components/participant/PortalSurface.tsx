'use client'

import { usePathname } from 'next/navigation'
import { VisualSurface } from '@/components/visual-system'
import styles from './portal.module.css'

/** Presentation only. Authentication, theme and lifecycle remain with their existing owners. */
export function PortalSurface({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const pathname = usePathname()
  return <VisualSurface mode={admin ? 'admin' : 'participant'} className={styles.portal}
    data-portal={admin ? 'admin' : 'participant'} data-utility={pathname === '/ticket' || pathname === '/profile'}>
    {children}
  </VisualSurface>
}
