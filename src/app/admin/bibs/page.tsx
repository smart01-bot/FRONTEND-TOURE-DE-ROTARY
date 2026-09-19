'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Hash } from 'lucide-react'
import { useAdminRegistrations } from '@/hooks/useAdmin'
import { adminAssignBib } from '@/lib/supabase/admin'
import { cn } from '@/lib/utils'
import { Avatar, CARD, CategoryChip, EYEBROW, PageBody, PageHeader, Spinner } from '@/components/admin/ui'

export default function BibsPage() {
  const { rows, loading, refresh } = useAdminRegistrations()
  const router = useRouter()
  const [inputs,     setInputs]     = useState<Record<string, string>>({})
  const [saving,     setSaving]     = useState<Record<string, boolean>>({})
  const [autoSaving, setAutoSaving] = useState(false)

  const queue    = rows.filter(r => r.payment_status === 'paid' && !r.bib_number)
  const assigned = rows.filter(r => r.bib_number)

  if (loading) return <Spinner />

  async function handleAssign(id: string) {
    const val = (inputs[id] ?? '').trim()
    if (!val) return
    setSaving(s => ({ ...s, [id]: true }))
    await adminAssignBib(id, val.padStart(3, '0'))
    await refresh()
    setSaving(s => ({ ...s, [id]: false }))
    setInputs(i => ({ ...i, [id]: '' }))
  }

  async function handleAutoAssign() {
    setAutoSaving(true)
    let next = assigned.length > 0
      ? Math.max(...assigned.map(r => parseInt(r.bib_number ?? '0', 10))) + 1
      : 1
    for (const r of queue) {
      await adminAssignBib(r.id, String(next).padStart(3, '0'))
      next++
    }
    await refresh()
    setAutoSaving(false)
  }

  return (
    <PageBody>
      <PageHeader
        eyebrow="Race numbers"
        title="Bib queue."
        subtitle={
          queue.length > 0
            ? `${queue.length} confirmed athlete${queue.length !== 1 ? 's' : ''} need a bib. Assign numbers one by one or auto-assign the rest.`
            : 'All paid athletes have bibs assigned.'
        }
        pill={{ icon: <Hash size={14} strokeWidth={2.5} />, label: 'Assigned', value: String(assigned.length) }}
      />

      <section className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,.7fr)] lg:items-start">
        {/* Queue */}
        <div className={CARD}>
          <div className="flex items-center justify-between border-b border-[#edf1f5] px-5 py-5 sm:px-6">
            <div>
              <p className={EYEBROW}>Waiting</p>
              <h2 className="mt-1 text-[16px] font-extrabold text-[#10233f]">Needs a bib · {queue.length}</h2>
            </div>
            <Hash size={18} className="text-[#94a3b8]" />
          </div>

          {queue.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                <CheckCircle2 size={19} />
              </div>
              <p className="mt-4 text-[13px] font-semibold text-[#475569]">The queue is clear.</p>
              <p className="mx-auto mt-1 max-w-[300px] text-[11px] leading-5 text-[#94a3b8]">
                New paid registrations will appear here until a bib is assigned.
              </p>
            </div>
          ) : (
            <>
              <div className="px-5 sm:px-6">
                {queue.map(row => {
                  const name = row.profiles?.full_name ?? 'Unknown'
                  const value = inputs[row.id] ?? ''
                  const disabled = saving[row.id] || !value.trim()
                  return (
                    <div key={row.id} className="flex items-center gap-3 border-b border-[#edf1f5] py-4 last:border-0">
                      <Avatar name={name} />
                      <button
                        type="button"
                        onClick={() => router.push(`/admin/athletes/${row.id}`)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <p className="truncate text-[13px] font-semibold text-[#334155]">{name}</p>
                        <div className="mt-1.5"><CategoryChip category={row.category} /></div>
                      </button>
                      <div className="flex shrink-0 items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={999}
                          value={value}
                          onChange={e => setInputs(p => ({ ...p, [row.id]: e.target.value }))}
                          placeholder="042"
                          aria-label={`Bib number for ${name}`}
                          className="w-[68px] rounded-[10px] border border-[#dbe7f4] bg-[#f7faff] px-2 py-2.5 text-center font-num text-[13px] font-extrabold text-[#10233f] outline-none transition [appearance:textfield] focus:border-[#2563eb]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAssign(row.id)}
                          disabled={disabled}
                          className={cn(
                            'rounded-[10px] bg-[#2563eb] px-3.5 py-2.5 text-[11px] font-extrabold text-white transition hover:bg-[#1d4ed8]',
                            disabled && 'cursor-not-allowed opacity-40',
                          )}
                        >
                          {saving[row.id] ? '…' : 'Assign'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-[#edf1f5] p-5 sm:p-6">
                <button
                  type="button"
                  onClick={handleAutoAssign}
                  disabled={autoSaving}
                  className={cn(
                    'w-full rounded-[12px] bg-[#2563eb] py-3.5 text-[12px] font-extrabold text-white transition hover:bg-[#1d4ed8]',
                    autoSaving && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {autoSaving ? 'Assigning…' : 'Auto-assign remaining bibs'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Assigned */}
        <div className={CARD}>
          <div className="flex items-center justify-between border-b border-[#edf1f5] px-5 py-5 sm:px-6">
            <div>
              <p className={EYEBROW}>Done</p>
              <h2 className="mt-1 text-[16px] font-extrabold text-[#10233f]">Assigned · {assigned.length}</h2>
            </div>
            <CheckCircle2 size={18} className="text-[#94a3b8]" />
          </div>

          {assigned.length === 0 ? (
            <p className="px-6 py-10 text-center text-[12px] text-[#94a3b8]">No bibs assigned yet.</p>
          ) : (
            <div className="px-5 sm:px-6">
              {assigned.slice(0, 8).map(row => (
                <div key={row.id} className="flex items-center justify-between gap-4 border-b border-[#edf1f5] py-3.5 last:border-0">
                  <span className="truncate text-[13px] font-semibold text-[#334155]">
                    {row.profiles?.full_name ?? 'Unknown'}
                  </span>
                  <span className="shrink-0 font-num text-[13px] font-extrabold text-[#2563eb]">#{row.bib_number}</span>
                </div>
              ))}
              {assigned.length > 8 && (
                <p className="py-3.5 text-center text-[11px] font-medium text-[#94a3b8]">
                  +{assigned.length - 8} more
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </PageBody>
  )
}
