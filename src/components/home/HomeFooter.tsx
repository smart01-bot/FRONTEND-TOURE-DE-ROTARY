import Link from 'next/link'
import { SITE } from '@/config/site'

export default function HomeFooter() {
  return (
    <footer className="bg-navy-900 px-5 py-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="font-serif text-[16px] font-bold text-white mb-1 leading-none">
          {SITE.name}
        </div>
        <div className="font-sans text-[11px] text-white/30 font-medium">
          {SITE.event.location}
        </div>
      </div>
      <div className="text-right">
        <div className="font-sans text-[10px] font-bold text-bronze uppercase tracking-[.06em] leading-snug">
          Supporting<br />{SITE.beneficiary.short}
        </div>
        <Link href="/privacy" className="mt-2 inline-flex min-h-11 items-center font-sans text-[10px] font-semibold text-white/65 underline underline-offset-4">
          Privacy &amp; data rights
        </Link>
      </div>
    </footer>
  )
}
