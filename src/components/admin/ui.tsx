// ─────────────────────────────────────────────────────────────────────────────
// Tour de Rotary — HQ Admin shared UI (matches the participant portal styling)
// ─────────────────────────────────────────────────────────────────────────────

import { cn } from '@/lib/utils'

export const CARD =
  'rounded-[24px] border border-[#dce5ef] bg-white shadow-[0_10px_30px_rgba(15,35,63,0.045)]'

export const EYEBROW =
  'font-num text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#94a3b8]'

export function initialsOf(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export function PageHeader({
  eyebrow, title, subtitle, pill,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  pill?: { icon: React.ReactNode; label: string; value: string }
}) {
  return (
    <header className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-end sm:justify-between lg:pt-9">
      <div>
        <p className="mb-2 font-num text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2563eb]">
          {eyebrow}
        </p>
        <h1 className="font-serif text-[32px] font-bold leading-none tracking-[-0.035em] text-[#10233f] sm:text-[38px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-[560px] text-[13px] leading-6 text-[#64748b]">{subtitle}</p>
        )}
      </div>

      {pill && (
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#dbe4ef] bg-white px-3 py-2 shadow-sm">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
            {pill.icon}
          </span>
          <div className="pr-1">
            <p className="font-num text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#94a3b8]">{pill.label}</p>
            <p className="font-num text-[13px] font-extrabold text-[#10233f]">{pill.value}</p>
          </div>
        </div>
      )}
    </header>
  )
}

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full border border-[#dbe7f4] bg-[#eff6ff] font-num font-extrabold text-[#2563eb]"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.33) }}
      aria-hidden
    >
      {initialsOf(name)}
    </div>
  )
}

export function StatusChip({ paid }: { paid: boolean }) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-[3px] font-num text-[9px] font-extrabold uppercase tracking-[0.08em]',
        paid ? 'bg-[#e8f7ef] text-[#15803d]' : 'bg-[#fdf3e3] text-[#a3670c]',
      )}
    >
      {paid ? 'Paid' : 'Pending'}
    </span>
  )
}

export function CategoryChip({ category }: { category: string }) {
  return (
    <span className="rounded-full bg-[#eff6ff] px-2.5 py-[3px] font-num text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#2563eb]">
      {category}
    </span>
  )
}

export function Spinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
    </div>
  )
}

export function PageBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pb-12 sm:px-7 lg:px-10 lg:pb-14">
      {children}
    </div>
  )
}
