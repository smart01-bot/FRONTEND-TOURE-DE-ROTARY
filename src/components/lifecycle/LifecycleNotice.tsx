import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'

export function LifecycleNotice({ dark = false }: { dark?: boolean }) {
  const lifecycle = ACTIVE_LIFECYCLE

  return (
    <aside className={`border-b px-5 py-3 font-sans sm:px-7 lg:px-10 ${dark ? 'border-white/10 bg-[#0C2748] text-white' : 'border-navy/10 bg-[#EAF1F8] text-navy'}`} aria-label="Current event state">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-num text-[9px] font-extrabold uppercase tracking-[.13em] text-[#B12A70]">{lifecycle.label}</span>
        {lifecycle.editionLabel && <span className="font-num text-[9px] font-bold opacity-50">{lifecycle.editionLabel}</span>}
        <span className="text-[10px] leading-relaxed opacity-60">{lifecycle.summary}</span>
      </div>
    </aside>
  )
}
