'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, Search, Users } from 'lucide-react'
import { useAdminRegistrations } from '@/hooks/useAdmin'
import { cn } from '@/lib/utils'
import type { RegistrationRow } from '@/lib/supabase/admin'
import { Avatar, CARD, CategoryChip, PageBody, PageHeader, Spinner, StatusChip } from '@/components/admin/ui'

type StatusFilter   = 'all' | 'paid' | 'pending'
type CategoryFilter = 'all' | 'sprint' | 'olympic' | 'relay'

export default function AthletesPage() {
  const { rows, stats, loading } = useAdminRegistrations()
  const router = useRouter()

  const [query,    setQuery]    = useState('')
  const [status,   setStatus]   = useState<StatusFilter>('all')
  const [category, setCategory] = useState<CategoryFilter>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter(r => {
      const name  = (r.profiles?.full_name ?? '').toLowerCase()
      const phone = (r.profiles?.phone     ?? '').toLowerCase()
      if (q && !name.includes(q) && !phone.includes(q)) return false
      if (status   !== 'all' && r.payment_status !== status)   return false
      if (category !== 'all' && r.category       !== category) return false
      return true
    })
  }, [rows, query, status, category])

  if (loading) return <Spinner />

  return (
    <PageBody>
      <PageHeader
        eyebrow="Registrations"
        title="Athletes."
        subtitle="Search, filter and open any registration to confirm payment or assign a bib."
        pill={{ icon: <Users size={14} strokeWidth={2.5} />, label: 'Showing', value: `${filtered.length} of ${rows.length}` }}
      />

      {/* Search + filters */}
      <section className="mt-7">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name or phone…"
            aria-label="Search athletes"
            className="w-full rounded-[16px] border border-[#dce5ef] bg-white py-3.5 pl-11 pr-4 text-[13px] text-[#10233f] shadow-[0_10px_30px_rgba(15,35,63,0.045)] outline-none transition placeholder:text-[#94a3b8] focus:border-[#2563eb]"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {(['all', 'pending', 'paid'] as StatusFilter[]).map(s => (
            <FilterChip key={s} active={status === s} onClick={() => setStatus(s)}>
              {s === 'all'
                ? `All · ${stats?.total ?? 0}`
                : s === 'paid'
                  ? `Paid · ${stats?.paid ?? 0}`
                  : `Pending · ${stats?.pending ?? 0}`}
            </FilterChip>
          ))}
          <span className="mx-1 hidden h-7 w-px bg-[#dce5ef] sm:block" />
          {(['olympic', 'sprint', 'relay'] as CategoryFilter[]).map(c => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(c === category ? 'all' : c)}>
              {c}
            </FilterChip>
          ))}
        </div>
      </section>

      {/* List */}
      <section className={`${CARD} mt-5`}>
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
              <Search size={19} />
            </div>
            <p className="mt-4 text-[13px] font-semibold text-[#475569]">No athletes match.</p>
            <p className="mx-auto mt-1 max-w-[300px] text-[11px] leading-5 text-[#94a3b8]">
              Try a different name or clear the filters.
            </p>
          </div>
        ) : (
          <div className="px-2 py-2 sm:px-3">
            {filtered.map(row => (
              <AthleteRow key={row.id} row={row} onClick={() => router.push(`/admin/athletes/${row.id}`)} />
            ))}
          </div>
        )}
      </section>
    </PageBody>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3.5 py-2 font-num text-[10px] font-extrabold uppercase tracking-[0.08em] transition',
        active
          ? 'border-[#cfe0f7] bg-[#eff6ff] text-[#2563eb]'
          : 'border-[#dce5ef] bg-white text-[#64748b] hover:border-[#cbd8e6]',
      )}
    >
      {children}
    </button>
  )
}

function AthleteRow({ row, onClick }: { row: RegistrationRow; onClick: () => void }) {
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
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <CategoryChip category={row.category} />
          {row.profiles?.phone && (
            <span className="hidden text-[11px] text-[#94a3b8] sm:inline">{row.profiles.phone}</span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <StatusChip paid={row.payment_status === 'paid'} />
        <span className="font-num text-[11px] font-extrabold text-[#94a3b8]">
          {row.bib_number ? `#${row.bib_number}` : '—'}
        </span>
      </div>
      <ArrowUpRight size={16} className="hidden shrink-0 text-[#94a3b8] sm:block" />
    </button>
  )
}
