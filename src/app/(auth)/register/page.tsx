import type { Metadata } from 'next'
import RegistrationFlow from '@/components/auth/RegistrationFlow'
import { ClosedAction } from '@/components/lifecycle/ClosedAction'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'
export const metadata: Metadata = { title: 'Register' }
export default function RegisterPage() {
  return ACTIVE_LIFECYCLE.registration.state === 'open'
    ? <RegistrationFlow />
    : <ClosedAction title="Registration is not open" explanation={ACTIVE_LIFECYCLE.registration.explanation} />
}
