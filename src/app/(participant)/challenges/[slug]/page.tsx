import Link from 'next/link'
import { CalendarRange, LockKeyhole, Medal, Target } from 'lucide-react'
import { CHALLENGES } from '@/config/community'
import { formatEventDate } from '@/lib/utils'

export default function ChallengeDetailPage({ params }: { params: { slug: string } }) {
  const challenge = CHALLENGES.find(item => item.slug === params.slug)

  if (!challenge) {
    return (
      <div className="participant-community min-h-full bg-[#f6f8fb] px-5 pb-12 pt-7 text-[#10233f] sm:px-7 lg:px-10 lg:pt-9">
        <div className="mx-auto max-w-[820px]">
          <Link href="/challenges" className="inline-flex min-h-11 items-center text-[10px] font-bold text-[#2563eb] underline underline-offset-4">Back to challenges</Link>
          <section className="mt-5 rounded-[24px] border border-[#dce5ef] bg-white px-6 py-12 text-center shadow-[0_10px_30px_rgba(15,35,63,.045)]">
            <LockKeyhole size={22} className="mx-auto text-[#94a3b8]" />
            <h1 className="mt-4 font-serif text-[25px] font-bold text-[#10233f]">Challenge not published.</h1>
            <p className="mx-auto mt-2 max-w-[480px] text-[11px] leading-5 text-[#64748b]">No approved challenge with this address exists. Dates, progress and completion data have not been invented.</p>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="participant-community min-h-full bg-[#f6f8fb] px-5 pb-12 pt-7 text-[#10233f] sm:px-7 lg:px-10 lg:pt-9">
      <div className="mx-auto max-w-[980px]">
        <Link href="/challenges" className="inline-flex min-h-11 items-center text-[10px] font-bold text-[#2563eb] underline underline-offset-4">Back to challenges</Link>
        <header className="mt-3 rounded-[24px] border border-[#cfe0f7] bg-[#102f59] p-6 text-white shadow-[0_12px_35px_rgba(15,35,63,.1)] sm:p-8">
          <p className="font-num text-[9px] font-extrabold uppercase tracking-[.13em] text-[#7db3ff]">Challenge</p>
          <h1 className="mt-2 font-serif text-[30px] font-bold">{challenge.title}</h1>
          <p className="mt-3 max-w-[640px] text-[12px] leading-6 text-white/65">{challenge.description}</p>
        </header>

        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          <Fact icon={CalendarRange} label="Starts" value={formatEventDate(challenge.starts_at)} />
          <Fact icon={CalendarRange} label="Ends" value={formatEventDate(challenge.ends_at)} />
          <Fact icon={Target} label="Target" value={`${challenge.target} ${challenge.unit}`} />
        </section>

        <section className="mt-5 rounded-[24px] border border-[#dce5ef] bg-white p-6 shadow-[0_10px_30px_rgba(15,35,63,.045)]">
          <div className="flex items-start gap-3">
            <Medal size={19} className="mt-0.5 text-[#2563eb]" />
            <div>
              <h2 className="font-serif text-[19px] font-bold text-[#10233f]">Participation is not connected.</h2>
              <p className="mt-1 text-[10px] leading-5 text-[#64748b]">Joining, progress, completion counts, history, badges and sharing require approved participation and verification contracts.</p>
              <button type="button" disabled title="Requires an approved challenge participation contract" className="mt-4 min-h-11 cursor-not-allowed rounded-[12px] bg-[#eaf0f6] px-5 text-[10px] font-extrabold text-[#94a3b8]">Join challenge</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
function Fact({ icon: Icon, label, value }: { icon: typeof Target; label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-[#dce5ef] bg-white p-5 shadow-[0_8px_24px_rgba(15,35,63,.04)]">
      <Icon size={17} className="text-[#2563eb]" />
      <p className="mt-3 font-num text-[8px] font-extrabold uppercase tracking-[.1em] text-[#94a3b8]">{label}</p>
      <p className="mt-1 text-[12px] font-extrabold text-[#10233f]">{value}</p>
    </div>
  )
}
