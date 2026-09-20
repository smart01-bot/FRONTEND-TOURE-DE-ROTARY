'use client'

import Link from 'next/link'
import { AlertCircle, CheckCircle2, Clock3, Search, ShieldAlert, TimerReset } from 'lucide-react'
import { RaceDayHeader } from '@/components/race-day/RaceDayHeader'
import { CapabilityCards } from '@/components/race-day/CapabilityCards'
import { RESULT_CAPABILITIES } from '@/config/race-day'
import { useParticipant } from '@/hooks/useParticipant'

const states = [
  { label: 'Provisional', icon: Clock3, text: 'Published for review and still subject to correction.' },
  { label: 'Official', icon: CheckCircle2, text: 'Confirmed by the approved timing and event process.' },
  { label: 'Unavailable', icon: AlertCircle, text: 'No verified result has been published.' },
  { label: 'Disqualified', icon: ShieldAlert, text: 'Shown only with an official status and applicable reason.' },
]

export default function ResultsPage() {
  const { registration, loading } = useParticipant()
  const bib = registration?.bib_number

  return (
    <div className="participant-race-day min-h-full bg-[#f6f8fb] text-[#10233f]">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-7 sm:px-7 lg:px-10 lg:pb-14 lg:pt-9">
        <RaceDayHeader eyebrow="Race day" title="Results." description="Your finishing time and discipline splits will live here after verified timing data is published." />

        <section className="mt-7 rounded-[24px] border border-[#cfe0f7] bg-[#102f59] p-5 text-white shadow-[0_12px_35px_rgba(15,35,63,.1)] sm:p-6" aria-labelledby="result-state">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#7db3ff]"><TimerReset size={20} /></span>
            <div>
              <p className="font-num text-[9px] font-extrabold uppercase tracking-[.12em] text-white/45">{loading ? 'Checking registration' : bib ? `Bib #${bib}` : 'Participant result'}</p>
              <h2 id="result-state" className="mt-1 font-serif text-[20px] font-bold">No verified result is available.</h2>
              <p className="mt-2 max-w-[720px] text-[11px] leading-5 text-white/60">No timing table, provider API or publication rules exist in the repository. Registration and bib assignment are not evidence that a participant started or finished.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5" aria-label="Result fields">
            {['Overall', 'Swim', 'Bike', 'Run', 'Transitions'].map(label => <div key={label} className="rounded-[13px] border border-white/10 bg-white/5 p-3"><p className="font-num text-[8px] font-extrabold uppercase tracking-[.1em] text-white/40">{label}</p><p className="mt-1 font-num text-[18px] font-extrabold text-white/35">—</p></div>)}
          </div>
        </section>

        <section className="mt-5 rounded-[18px] border border-[#dce5ef] bg-white p-5">
          <label htmlFor="result-search" className="text-[11px] font-extrabold text-[#10233f]">Find a participant result</label>
          <div className="relative mt-2"><Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" /><input id="result-search" disabled placeholder="Search becomes available with an approved result index" className="min-h-12 w-full cursor-not-allowed rounded-[13px] border border-[#dce5ef] bg-[#f8fafc] pl-11 pr-4 text-[11px] text-[#64748b] opacity-70" /></div>
          <p className="mt-2 text-[9px] leading-4 text-[#94a3b8]">Public search and filters require privacy rules and verified searchable fields.</p>
        </section>

        <section className="mt-7" aria-labelledby="publication-states"><h2 id="publication-states" className="mb-4 text-[13px] font-extrabold">Prepared publication states</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{states.map(({ label, icon: Icon, text }) => <article key={label} className="rounded-[18px] border border-[#dce5ef] bg-white p-5"><Icon size={17} className="text-[#2563eb]" /><h3 className="mt-3 font-serif text-[16px] font-bold">{label}</h3><p className="mt-1 text-[10px] leading-5 text-[#64748b]">{text}</p></article>)}</div></section>
        <section className="mt-7"><CapabilityCards items={RESULT_CAPABILITIES} /></section>
        <p className="mt-6 text-[10px] text-[#64748b]">Your real bib and story can already be used privately in <Link href="/results/memories" className="font-bold text-[#2563eb] underline underline-offset-4">Memories</Link>.</p>
      </div>
    </div>
  )
}
