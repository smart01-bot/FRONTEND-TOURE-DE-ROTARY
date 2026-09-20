import { RaceDayNav } from './RaceDayNav'

export function RaceDayHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <>
      <header className="max-w-[720px]">
        <p className="mb-2 font-num text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">{eyebrow}</p>
        <h1 className="font-serif text-[32px] font-bold leading-none tracking-[-.035em] text-[#10233f] sm:text-[38px]">{title}</h1>
        <p className="mt-3 text-[13px] leading-6 text-[#64748b]">{description}</p>
      </header>
      <RaceDayNav />
    </>
  )
}
