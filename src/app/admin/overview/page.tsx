'use client'

import { useRouter } from 'next/navigation'
import { ArrowUpRight, Banknote, CheckCircle2, Hash, Users } from 'lucide-react'
import { useAdminRegistrations } from '@/hooks/useAdmin'
import { formatTSh } from '@/lib/utils'
import type { RegistrationRow } from '@/lib/supabase/admin'
import { Avatar, CARD, CategoryChip, EYEBROW, PageBody, PageHeader, Spinner, StatusChip } from '@/components/admin/ui'

export default function OverviewPage() {
  const { rows, stats, loading } = useAdminRegistrations()
  const router = useRouter()

  if (loading || !stats) return <Spinner />

  const recent = rows.slice(0, 6)
  const maxCat = Math.max(stats.byCategory.olympic, stats.byCategory.sprint, stats.byCategory.relay, 1)

  return (
    <PageBody>
      <PageHeader
        eyebrow="Race overview"
        title="HQ overview."
        subtitle="Registrations, revenue and bib progress for Tour de Rotary · 1 November 2026."
        pill={{ icon: <Users size={14} strokeWidth={2.5} />, label: 'Registrations', value: String(stats.total) }}
      />

      {/* Stats */}
      <section className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon={<Users size={16} />}        label="Registrations" value={String(stats.total)} />
        <StatCard icon={<CheckCircle2 size={16} />} label="Paid"          value={String(stats.paid)} />
        <StatCard icon={<Banknote size={16} />}     label="Revenue"       value={formatTSh(stats.revenue)} small />
        <StatCard icon={<Hash size={16} />}         label="Need a bib"    value={String(stats.unbibed)} />
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
        {/* By category */}
        <div className={`${CARD} p-5 sm:p-6`}>
          <p className={EYEBROW}>Breakdown</p>
          <h2 className="mt-1 text-[16px] font-extrabold text-[#10233f]">By category</h2>

          <div className="mt-6 space-y-5">
            {(['olympic', 'sprint', 'relay'] as const).map(cat => (
              <div key={cat}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-[12px] font-semibold capitalize text-[#64748b]">{cat}</span>
                  <span className="font-num text-[13px] font-extrabold text-[#10233f]">{stats.byCategory[cat]}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#eaf0f6]">
                  <div
                    className="h-full rounded-full bg-[#2563eb] transition-all duration-700"
                    style={{ width: `${(stats.byCategory[cat] / maxCat) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div className={CARD}>
          <div className="flex items-center justify-between border-b border-[#edf1f5] px-5 py-5 sm:px-6">
            <div>
              <p className={EYEBROW}>Latest</p>
              <h2 className="mt-1 text-[16px] font-extrabold text-[#10233f]">Recent registrations</h2>
            </div>
            <a href="/admin/athletes" className="flex items-center gap-1 text-[12px] font-extrabold text-[#2563eb]">
              View all <ArrowUpRight size={14} />
            </a>
          </div>

          {recent.length === 0 ? (
            <p className="px-6 py-12 text-center text-[13px] font-semibold text-[#475569]">No registrations yet.</p>
          ) : (
            <div className="px-2 py-1 sm:px-3">
              {recent.map(row => (
                <RegRow key={row.id} row={row} onClick={() => router.push(`/admin/athletes/${row.id}`)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageBody>
  )
}

function StatCard({ icon, label, value, small }: { icon: React.ReactNode; label: string; value: string; small?: boolean }) {
  return (
    <div className={`${CARD} p-4 sm:p-5`}>
      <div className="flex items-center justify-between">
        <p className={EYEBROW}>{label}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">{icon}</span>
      </div>
      <p className={`mt-4 font-num font-extrabold leading-none tracking-[-0.03em] text-[#10233f] ${small ? 'text-[20px] sm:text-[24px]' : 'text-[30px] sm:text-[36px]'}`}>
        {value}
      </p>
    </div>
  )
}

function RegRow({ row, onClick }: { row: RegistrationRow; onClick: () => void }) {
  const name = row.profiles?.full_name ?? 'Unknown'
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-left transition hover:bg-[rgba(37,99,235,.05)]"
    >
      <Avatar name={name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-[#334155]">{name}</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <CategoryChip category={row.category} />
          <StatusChip paid={row.payment_status === 'paid'} />
        </div>
      </div>
      <ArrowUpRight size={16} className="shrink-0 text-[#94a3b8]" />
    </button>
  )
}
