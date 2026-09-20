'use client'

import { Award, Flag, Medal, Users } from 'lucide-react'
import { RaceDayHeader } from '@/components/race-day/RaceDayHeader'
import { MemoryCardStudio } from '@/components/race-day/MemoryCardStudio'
import { useParticipant } from '@/hooks/useParticipant'

const blocked = [
  { title: '“I did Tour de Dar”', text: 'Requires verified completion.', icon: Flag },
  { title: 'Result card', text: 'Requires a published result.', icon: Medal },
  { title: 'Team card', text: 'Requires real membership.', icon: Users },
  { title: 'Challenge card', text: 'Requires verified completion.', icon: Award },
]

export default function MemoriesPage() {
  const { profile, registration, loading } = useParticipant()
  return <div className="participant-race-day min-h-full bg-[#f6f8fb] text-[#10233f]"><div className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-7 sm:px-7 lg:px-10 lg:pb-14 lg:pt-9">
    <RaceDayHeader eyebrow="Race memories" title="Your memory cards." description="Save and share cards created only from your own verified participant details. Completion claims stay locked until results exist." />
    <section className="mt-7" aria-label="Available memory cards">{loading ? <div className="flex min-h-[260px] items-center justify-center"><span className="h-6 w-6 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" /></div> : <MemoryCardStudio profile={profile} registration={registration} />}</section>
    <section className="mt-8" aria-labelledby="locked-cards"><h2 id="locked-cards" className="mb-4 text-[13px] font-extrabold">Cards waiting for verified records</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{blocked.map(({ title, text, icon: Icon }) => <article key={title} className="rounded-[18px] border border-[#dce5ef] bg-white p-5"><Icon size={18} className="text-[#94a3b8]" /><h3 className="mt-3 font-serif text-[16px] font-bold">{title}</h3><p className="mt-1 text-[10px] leading-5 text-[#64748b]">{text}</p><button disabled className="mt-4 min-h-11 w-full cursor-not-allowed rounded-[12px] border border-[#dce5ef] text-[10px] font-bold text-[#94a3b8]">Unavailable</button></article>)}</div></section>
  </div></div>
}
