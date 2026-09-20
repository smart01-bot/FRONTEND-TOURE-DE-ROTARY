import Link from 'next/link'
import { CalendarRange, Database, Medal, Share2, Target } from 'lucide-react'
import { CapabilityGrid } from '@/components/community/CapabilityGrid'
import { CHALLENGE_CAPABILITIES, CHALLENGES } from '@/config/community'

export default function ChallengesPage() {
  return (
    <div className="participant-community min-h-full bg-[#f6f8fb] text-[#10233f]">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-7 sm:px-7 lg:px-10 lg:pb-14 lg:pt-9">
        <Link href="/feed" className="inline-flex min-h-11 items-center text-[10px] font-bold text-[#2563eb] underline underline-offset-4">Back to The Run-Up</Link>

        <header className="mt-2 max-w-[680px]">
          <p className="mb-2 font-num text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">Community</p>
          <h1 className="font-serif text-[32px] font-bold leading-none tracking-[-.035em] text-[#10233f] sm:text-[38px]">Challenges.</h1>
          <p className="mt-3 text-[13px] leading-6 text-[#64748b]">Join event activities, record real progress and earn completion memories once approved challenge data and verification are available.</p>
        </header>

        <section className="mt-7 rounded-[24px] border border-[#cfe0f7] bg-[#102f59] p-5 text-white shadow-[0_12px_35px_rgba(15,35,63,.1)] sm:p-6" aria-labelledby="challenges-status">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#7db3ff]"><Database size={19} /></span>
            <div>
              <h2 id="challenges-status" className="font-serif text-[20px] font-bold">No challenge catalogue is connected.</h2>
              <p className="mt-2 max-w-[720px] text-[11px] leading-5 text-white/60">The repository contains {CHALLENGES.length} approved challenges and no participation or completion contract. Dates, progress and completion counts will not be invented.</p>
            </div>
          </div>
        </section>

        {CHALLENGES.length > 0 && (
          <section className="mt-5 grid gap-3 sm:grid-cols-2" aria-label="Published challenges">
            {CHALLENGES.map(challenge => (
              <article key={challenge.id} className="rounded-[18px] border border-[#dce5ef] bg-white p-5 shadow-[0_8px_24px_rgba(15,35,63,.04)]">
                <p className="font-num text-[9px] font-extrabold uppercase tracking-[.1em] text-[#2563eb]">{challenge.unit} challenge</p>
                <h2 className="mt-2 font-serif text-[18px] font-bold text-[#10233f]">{challenge.title}</h2>
                <p className="mt-2 text-[10px] leading-5 text-[#64748b]">{challenge.description}</p>
                <Link href={`/challenges/${challenge.slug}`} className="mt-4 inline-flex min-h-11 items-center text-[10px] font-extrabold text-[#2563eb] underline underline-offset-4">View challenge details</Link>
              </article>
            ))}
          </section>
        )}

        <section className="mt-5 grid gap-3 sm:grid-cols-3" aria-label="Challenge availability">
          <UnavailableCard icon={CalendarRange} title="Dates unavailable" text="Start and end dates require approved challenge definitions." />
          <UnavailableCard icon={Medal} title="No badges issued" text="A badge requires a real, verified completion record." />
          <UnavailableCard icon={Share2} title="Sharing unavailable" text="Sharing is enabled only for an actual participant completion." />
        </section>

        <section className="mt-7" aria-labelledby="challenge-capabilities">
          <div className="mb-4 flex items-center gap-2">
            <Target size={17} className="text-[#2563eb]" />
            <h2 id="challenge-capabilities" className="text-[13px] font-extrabold text-[#10233f]">Prepared challenge experience</h2>
          </div>
          <CapabilityGrid capabilities={CHALLENGE_CAPABILITIES} />
        </section>
      </div>
    </div>
  )
}

function UnavailableCard({ icon: Icon, title, text }: { icon: typeof CalendarRange; title: string; text: string }) {
  return (
    <article className="rounded-[18px] border border-[#dce5ef] bg-white p-5 shadow-[0_8px_24px_rgba(15,35,63,.04)]">
      <Icon size={18} className="text-[#94a3b8]" />
      <h2 className="mt-3 font-serif text-[16px] font-bold text-[#10233f]">{title}</h2>
      <p className="mt-1 text-[10px] leading-5 text-[#64748b]">{text}</p>
    </article>
  )
}
