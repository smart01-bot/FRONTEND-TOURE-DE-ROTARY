import { CameraOff, CircleDashed, Database, TimerOff } from 'lucide-react'
import type { RaceDayCapability } from '@/types/race-day'

const meta = {
  available: { label: 'Available', icon: CircleDashed, tone: 'bg-[#e8f7ef] text-[#15803d]' },
  timing_required: { label: 'Timing required', icon: TimerOff, tone: 'bg-[#eff6ff] text-[#2563eb]' },
  storage_required: { label: 'Storage required', icon: CameraOff, tone: 'bg-[#fdf3e3] text-[#a3670c]' },
  backend_required: { label: 'Backend required', icon: Database, tone: 'bg-[#fbe9f2] text-[#B12A70]' },
  decision_required: { label: 'Decision required', icon: CircleDashed, tone: 'bg-[#fdf3e3] text-[#a3670c]' },
}

export function CapabilityCards({ items }: { items: RaceDayCapability[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(item => {
        const status = meta[item.status]
        const Icon = status.icon
        return (
          <article key={item.id} className="rounded-[18px] border border-[#dce5ef] bg-white p-5 shadow-[0_8px_24px_rgba(15,35,63,.04)]">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-num text-[8px] font-extrabold uppercase tracking-[.08em] ${status.tone}`}><Icon size={12} /> {status.label}</span>
            <h3 className="mt-3 font-serif text-[16px] font-bold text-[#10233f]">{item.label}</h3>
            <p className="mt-1 text-[10px] leading-5 text-[#64748b]">{item.description}</p>
          </article>
        )
      })}
    </div>
  )
}
