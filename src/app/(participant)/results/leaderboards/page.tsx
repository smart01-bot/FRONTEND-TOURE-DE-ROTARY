import { Filter, ListOrdered, Search } from 'lucide-react'
import { RaceDayHeader } from '@/components/race-day/RaceDayHeader'
import { CapabilityCards } from '@/components/race-day/CapabilityCards'
import { LEADERBOARD_CAPABILITIES } from '@/config/race-day'

export default function LeaderboardsPage() {
  return <div className="participant-race-day min-h-full bg-[#f6f8fb] text-[#10233f]"><div className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-7 sm:px-7 lg:px-10 lg:pb-14 lg:pt-9">
    <RaceDayHeader eyebrow="Race day" title="Leaderboards." description="Overall, discipline and community rankings will appear only when verified records support a fair comparison." />
    <section className="mt-7 rounded-[24px] border border-[#cfe0f7] bg-[#102f59] p-5 text-white sm:p-6"><div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#7db3ff]"><ListOrdered size={19} /></span><div><h2 className="font-serif text-[20px] font-bold">Rankings are not published.</h2><p className="mt-2 max-w-[720px] text-[11px] leading-5 text-white/60">There are no verified result, team, challenge or participation ranking records. No places, names, times or counts are being simulated.</p></div></div></section>
    <section className="mt-5 grid gap-3 rounded-[18px] border border-[#dce5ef] bg-white p-5 sm:grid-cols-[1fr_auto]"><div className="relative"><Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" /><input disabled aria-label="Search leaderboards" placeholder="Search unavailable" className="min-h-12 w-full cursor-not-allowed rounded-[13px] border border-[#dce5ef] bg-[#f8fafc] pl-11 pr-4 text-[11px] opacity-60" /></div><button disabled className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-[13px] border border-[#dce5ef] px-4 text-[10px] font-bold text-[#94a3b8]"><Filter size={14} /> Filters unavailable</button></section>
    <section className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{['Overall', 'Swim · Bike · Run', 'Teams', 'Challenges & participation'].map(label => <article key={label} className="rounded-[18px] border border-[#dce5ef] bg-white p-5"><p className="font-num text-[9px] font-extrabold uppercase tracking-[.1em] text-[#2563eb]">{label}</p><p className="mt-5 text-[11px] leading-5 text-[#64748b]">No verified rankings available.</p></article>)}</section>
    <section className="mt-7"><CapabilityCards items={LEADERBOARD_CAPABILITIES} /></section>
  </div></div>
}
