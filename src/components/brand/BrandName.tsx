import { SITE } from '@/config/site'

/** Shared product copy; organiser attribution and technical identifiers stay separate. */
export function BrandName() {
  return <>{SITE.name}</>
}
