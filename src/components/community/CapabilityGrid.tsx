import { CheckCircle2, CircleDashed, Database, HelpCircle } from 'lucide-react'
import type { CommunityCapability, CommunityCapabilityStatus } from '@/types/community'

const STATUS: Record<CommunityCapabilityStatus, { label: string; icon: typeof Database; className: string }> = {
  available: { label: 'Available', icon: CheckCircle2, className: 'bg-[#e8f7ef] text-[#15803d]' },
  backend_required: { label: 'Backend required', icon: Database, className: 'bg-[#eff6ff] text-[#2563eb]' },
  storage_required: { label: 'Storage required', icon: CircleDashed, className: 'bg-[#fdf3e3] text-[#a3670c]' },
  decision_required: { label: 'Decision required', icon: HelpCircle, className: 'bg-[#fbe9f2] text-[#B12A70]' },
}
export function CapabilityGrid({ capabilities }: { capabilities: CommunityCapability[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {capabilities.map(capability => {
        const status = STATUS[capability.status]
        const Icon = status.icon
        return (
          <article key={capability.id} className="min-w-0 rounded-[18px] border border-[#dce5ef] bg-white p-5 shadow-[0_8px_24px_rgba(15,35,63,.04)]">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-num text-[8px] font-extrabold uppercase tracking-[.08em] ${status.className}`}>
              <Icon size={11} /> {status.label}
            </span>
            <h2 className="mt-3 font-serif text-[17px] font-bold text-[#10233f]">{capability.label}</h2>
            <p className="mt-1 text-[10px] leading-5 text-[#64748b]">{capability.description}</p>
          </article>
        )
      })}
    </div>
  )
}
