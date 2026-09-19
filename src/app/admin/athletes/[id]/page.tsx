'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Hash, Mail, Phone, Wallet } from 'lucide-react'
import { useAdminRegistration } from '@/hooks/useAdmin'
import { adminConfirmPayment, adminAssignBib } from '@/lib/supabase/admin'
import { CATEGORY_MAP } from '@/config/categories'
import { cn } from '@/lib/utils'
import { Avatar, CARD, EYEBROW, PageBody, Spinner, StatusChip } from '@/components/admin/ui'

export default function AthleteDetailPage() {
  const { id }  = useParams<{ id: string }>()
  const router  = useRouter()
  const { row, loading, refresh } = useAdminRegistration(id)

  const [bibInput,  setBibInput]  = useState('')
  const [bibSaving, setBibSaving] = useState(false)
  const [paySaving, setPaySaving] = useState(false)
  const [bibMsg,    setBibMsg]    = useState<{ ok: boolean; text: string } | null>(null)

  useEffect(() => { if (row?.bib_number) setBibInput(row.bib_number) }, [row?.bib_number])

  if (loading) return <Spinner />
  if (!row)    return <NotFound onBack={() => router.back()} />

  const name     = row.profiles?.full_name ?? 'Unknown'
  const email    = row.profiles?.email     ?? '—'
  const phone    = row.profiles?.phone     ?? '—'
  const category = CATEGORY_MAP[row.category]
  const paid     = row.payment_status === 'paid'

  async function handleConfirmPayment() {
    setPaySaving(true)
    await adminConfirmPayment(row!.id)
    await refresh()
    setPaySaving(false)
  }

  async function handleAssignBib() {
    const val = bibInput.trim()
    if (!val) return
    setBibSaving(true)
    setBibMsg(null)
    const { error } = await adminAssignBib(row!.id, val.padStart(3, '0'))
    setBibMsg(error ? { ok: false, text: error } : { ok: true, text: `Bib #${val.padStart(3, '0')} assigned.` })
    if (!error) await refresh()
    setBibSaving(false)
  }

  return (
    <PageBody>
      {/* Back + identity */}
      <div className="pt-7 lg:pt-9">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-5 flex items-center gap-2 text-[12px] font-bold text-[#64748b] transition hover:text-[#10233f]"
        >
          <ArrowLeft size={15} /> Athletes
        </button>

        <div className="flex items-center gap-4">
          <Avatar name={name} size={56} />
          <div className="min-w-0">
            <p className="mb-1.5 font-num text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2563eb]">
              {category?.name ?? row.category} · {row.category === 'relay' ? 'Relay' : 'Individual'}
            </p>
            <h1 className="truncate font-serif text-[28px] font-bold leading-none tracking-[-0.03em] text-[#10233f] sm:text-[34px]">
              {name}
            </h1>
          </div>
        </div>
      </div>

      <section className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
        {/* Left — actions */}
        <div className="space-y-5">
          {/* Payment */}
          <div className={`${CARD} p-5 sm:p-6`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={EYEBROW}>Payment</p>
                <h2 className="mt-1 text-[16px] font-extrabold text-[#10233f]">Payment status</h2>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                {paid ? <CheckCircle2 size={17} /> : <Wallet size={17} />}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-[16px] border border-[#dbe7f4] bg-[#f7faff] px-4 py-3">
              <StatusChip paid={paid} />
              {!paid ? (
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={paySaving}
                  className={cn(
                    'rounded-[12px] bg-[#2563eb] px-4 py-2.5 text-[12px] font-extrabold text-white transition hover:bg-[#1d4ed8]',
                    paySaving && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {paySaving ? 'Saving…' : 'Confirm payment'}
                </button>
              ) : (
                <span className="text-[12px] font-semibold text-[#64748b]">Payment confirmed</span>
              )}
            </div>
          </div>

          {/* Bib */}
          <div className={`${CARD} p-5 sm:p-6`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={EYEBROW}>Race number</p>
                <h2 className="mt-1 text-[16px] font-extrabold text-[#10233f]">Bib assignment</h2>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                <Hash size={17} />
              </span>
            </div>

            <p className="mt-4 text-[12px] text-[#64748b]">
              {row.bib_number ? `Current bib: #${row.bib_number}` : 'No bib assigned yet.'}
            </p>

            <div className="mt-3 flex gap-2">
              <input
                type="number"
                min={1}
                max={999}
                value={bibInput}
                onChange={e => { setBibInput(e.target.value); setBibMsg(null) }}
                placeholder="042"
                aria-label="Bib number"
                className="w-[88px] rounded-[12px] border border-[#dbe7f4] bg-[#f7faff] px-3 py-3 text-center font-num text-[15px] font-extrabold text-[#10233f] outline-none transition [appearance:textfield] focus:border-[#2563eb]"
              />
              <button
                type="button"
                onClick={handleAssignBib}
                disabled={bibSaving || !bibInput.trim()}
                className={cn(
                  'flex-1 rounded-[12px] bg-[#2563eb] py-3 text-[12px] font-extrabold text-white transition hover:bg-[#1d4ed8]',
                  (bibSaving || !bibInput.trim()) && 'cursor-not-allowed opacity-45',
                )}
              >
                {bibSaving ? 'Saving…' : 'Assign bib'}
              </button>
            </div>

            {bibMsg && (
              <p className={cn('mt-3 text-[12px] font-semibold', bibMsg.ok ? 'text-[#15803d]' : 'text-[#d85b4d]')}>
                {bibMsg.text}
              </p>
            )}
          </div>
        </div>

        {/* Right — contact + story */}
        <div className="space-y-5">
          <div className={`${CARD} p-5 sm:p-6`}>
            <p className={EYEBROW}>Get in touch</p>
            <h2 className="mt-1 text-[16px] font-extrabold text-[#10233f]">Contact</h2>
            <div className="mt-4 space-y-2">
              <ContactRow icon={<Mail size={15} />}  value={email} />
              <ContactRow icon={<Phone size={15} />} value={phone} />
            </div>
          </div>

          <div className={`${CARD} p-5 sm:p-6`}>
            <p className={EYEBROW}>Their message</p>
            <h2 className="mt-1 text-[16px] font-extrabold text-[#10233f]">Race story</h2>
            {row.story ? (
              <div className="mt-4 rounded-[16px] border border-[#dbe7f4] bg-[#f7faff] p-5">
                <p className="text-[13px] italic leading-6 text-[#475569]">“{row.story}”</p>
              </div>
            ) : (
              <div className="mt-4 rounded-[16px] border border-dashed border-[#cbd8e6] bg-[#f8fafc] p-5">
                <p className="text-[12px] text-[#94a3b8]">This athlete hasn&apos;t shared a story yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageBody>
  )
}

function ContactRow({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-[#e4eaf1] bg-[#f8fafc] px-4 py-3">
      <span className="text-[#94a3b8]">{icon}</span>
      <span className="truncate text-[13px] font-semibold text-[#475569]">{value}</span>
    </div>
  )
}

function NotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-5">
      <p className="text-[14px] font-semibold text-[#475569]">Registration not found.</p>
      <button type="button" onClick={onBack} className="flex items-center gap-2 text-[12px] font-extrabold text-[#2563eb]">
        <ArrowLeft size={14} /> Back
      </button>
    </div>
  )
}
