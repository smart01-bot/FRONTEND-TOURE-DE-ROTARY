import Link from 'next/link'
import { Database, Search, TicketCheck, UserPlus, Users } from 'lucide-react'
import { CapabilityGrid } from '@/components/community/CapabilityGrid'
import { TEAM_CAPABILITIES } from '@/config/community'

const actions = [
  { label: 'Create a team', icon: UserPlus },
  { label: 'Join with code', icon: TicketCheck },
  { label: 'Search teams', icon: Search },
]

export default function TeamsPage() {
  return (
    <div className="participant-community min-h-full bg-[#f6f8fb] text-[#10233f]">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-7 sm:px-7 lg:px-10 lg:pb-14 lg:pt-9">
        <Link href="/feed" className="inline-flex min-h-11 items-center text-[10px] font-bold text-[#2563eb] underline underline-offset-4">Back to The Run-Up</Link>

        <header className="mt-2 max-w-[680px]">
          <p className="mb-2 font-num text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">Community</p>
          <h1 className="font-serif text-[32px] font-bold leading-none tracking-[-.035em] text-[#10233f] sm:text-[38px]">Teams.</h1>
          <p className="mt-3 text-[13px] leading-6 text-[#64748b]">Create a shared identity, invite people and prepare together—including relay squads—once the team service is approved.</p>
        </header>

        <section className="mt-7 rounded-[24px] border border-[#cfe0f7] bg-[#102f59] p-5 text-white shadow-[0_12px_35px_rgba(15,35,63,.1)] sm:p-6" aria-labelledby="teams-status">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#7db3ff]"><Database size={19} /></span>
            <div>
              <h2 id="teams-status" className="font-serif text-[20px] font-bold">Team services are not connected yet.</h2>
              <p className="mt-2 max-w-[720px] text-[11px] leading-5 text-white/60">No team, invitation, membership, role, statistics or activity contract exists in the repository. No team data is being assumed or displayed.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3" aria-describedby="teams-unavailable-reason">
            {actions.map(({ label, icon: Icon }) => (
              <button key={label} type="button" disabled title="Requires an approved team backend and RLS contract" className="flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-[13px] border border-white/15 bg-white/5 px-4 text-[10px] font-extrabold text-white/45">
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
          <p id="teams-unavailable-reason" className="mt-2 text-[9px] leading-4 text-white/40">These controls are disabled until the team backend and permissions are approved.</p>
        </section>

        <section className="mt-7" aria-labelledby="team-capabilities">
          <div className="mb-4 flex items-center gap-2">
            <Users size={17} className="text-[#2563eb]" />
            <h2 id="team-capabilities" className="text-[13px] font-extrabold text-[#10233f]">Prepared team experience</h2>
          </div>
          <CapabilityGrid capabilities={TEAM_CAPABILITIES} />
        </section>
      </div>
    </div>
  )
}
