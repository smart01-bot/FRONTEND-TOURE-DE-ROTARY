'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import QRCode from 'qrcode'
import { Download, Printer, Share2 } from 'lucide-react'
import { useParticipant } from '@/hooks/useParticipant'
import { CATEGORY_MAP } from '@/config/categories'
import { SITE } from '@/config/site'
import { useParticipantTheme } from '@/context/ParticipantThemeContext'

export default function TicketPage() {
  const { profile, registration, loading } = useParticipant()
  const { theme } = useParticipantTheme()
  const dark = theme === 'dark'

  if (loading) return <Spinner dark={dark} />

  const name = profile?.full_name ?? 'Participant'
  const category = registration?.category ? CATEGORY_MAP[registration.category] : null
  const bib = registration?.bib_number
  const paid = registration?.payment_status === 'paid'
  const confirmed = registration?.status === 'confirmed'
  const ticketReady = Boolean(registration && paid && confirmed && bib)
  const profileUrl = `${SITE.url}/profile`
  const qrValue = ticketReady ? `${profileUrl}?ticket=${registration?.id}` : ''

  const details = [
    { label: 'Race day', value: '1 November 2026' },
    { label: 'Venue', value: 'Coco Beach, Dar es Salaam' },
    { label: 'Check-in', value: 'TBD' },
    { label: 'Race start', value: 'TBD' },
  ]

  return (
    <div className={`w-full px-5 pb-10 pt-6 sm:px-7 lg:px-10 lg:pt-8 ${dark ? 'bg-[#071A33] text-white' : 'bg-[#F7F9FC] text-[#102E5C]'}`}>
      <div className="mx-auto max-w-[1180px]">
        {/* Page heading */}
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`mb-1 text-[11px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-[#5EA7E8]' : 'text-[#246DB5]'}`}>
              Participant portal
            </p>
            <h1 className={`font-serif text-[34px] font-bold leading-none tracking-[-0.03em] sm:text-[40px] ${dark ? 'text-[#EAF3FF]' : 'text-[#102E5C]'}`}>
              My ticket.
            </h1>
            <p className={`mt-2 text-sm ${dark ? 'text-white/55' : 'text-slate-500'}`}>
              Keep this ticket ready for race-day check-in.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${confirmed ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${confirmed ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {confirmed ? 'Registration confirmed' : 'Registration pending'}
            </span>
            {paid && (
              <span className={`rounded-full border px-3 py-1.5 ${dark ? 'border-white/10 bg-white/5 text-white/65' : 'border-slate-200 bg-white text-slate-600'}`}>
                Payment complete
              </span>
            )}
          </div>
        </div>

        {/* Ticket */}
        <section className={`overflow-hidden rounded-[28px] border shadow-[0_16px_45px_rgba(16,46,92,0.08)] ${dark ? 'border-white/10 bg-[#0C2748] shadow-[0_16px_45px_rgba(0,0,0,0.25)]' : 'border-slate-200 bg-white'}`}>
          <div className="grid lg:grid-cols-[1fr_320px]">
            {/* Main ticket face */}
            <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="absolute right-0 top-0 h-2 w-36 bg-[#F8C43A]" />
              <div className="absolute right-36 top-0 h-2 w-28 bg-[#B21F68]" />
              <div className="absolute right-64 top-0 h-2 w-24 bg-[#246DB5]" />

              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <Image
                      src="/assets/auth/tour-de-rotary-mark.png"
                      alt="Tour de Dar"
                      width={272}
                      height={272}
                      className="h-12 w-auto object-contain object-left"
                    />
                    <div className={`hidden h-9 w-px sm:block ${dark ? 'bg-white/10' : 'bg-slate-200'}`} />
                    <div className="hidden sm:block">
                      <p className={`text-[10px] font-bold uppercase tracking-[0.15em] ${dark ? 'text-white/40' : 'text-slate-400'}`}>Official participant ticket</p>
                      <p className={`mt-0.5 text-sm font-semibold ${dark ? 'text-white' : 'text-[#102E5C]'}`}>Dar es Salaam · 2026</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#B21F68]">Your race credential</p>
                  <h2 className={`mt-1 font-serif text-3xl font-bold ${dark ? 'text-white' : 'text-[#102E5C]'}`}>Ready for race day.</h2>
                </div>

                <div className="hidden sm:block">
                  <Image
                    src="/assets/TourdeRotary-main/25bibnumber.png"
                    alt="Bib"
                    width={128}
                    height={93}
                    className="h-[72px] w-auto object-contain"
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${dark ? 'text-white/40' : 'text-slate-400'}`}>Participant</p>
                  <p className={`mt-1 text-2xl font-bold ${dark ? 'text-white' : 'text-[#102E5C]'}`}>{name}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {category && (
                      <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${dark ? 'bg-[#123C70] text-[#7FC0FF]' : 'bg-[#EAF3FB] text-[#246DB5]'}`}>
                        {category.name}
                      </span>
                    )}
                    {registration?.discipline && (
                      <span className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${dark ? 'bg-[#4A3B12] text-[#F8C43A]' : 'bg-[#FFF7D9] text-[#8A6800]'}`}>
                        {registration.discipline}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#102E5C] px-6 py-4 text-center text-white sm:min-w-[190px]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">Bib number</p>
                  {bib ? (
                    <p className="mt-1 font-mono text-5xl font-extrabold leading-none tracking-tight">
                      {bib.padStart(3, '0')}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm font-semibold text-white/60">Not assigned</p>
                  )}
                </div>
              </div>

              <div className={`mt-8 grid gap-3 border-t pt-6 sm:grid-cols-2 ${dark ? 'border-white/10' : 'border-slate-100'}`}>
                {details.map(({ label, value }) => (
                  <div key={label} className={`rounded-xl px-4 py-3 ${dark ? 'bg-[#102F52]' : 'bg-[#F7F9FC]'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.12em] ${dark ? 'text-white/40' : 'text-slate-400'}`}>{label}</p>
                    <p className={`mt-1 text-sm font-semibold ${dark ? 'text-white' : 'text-[#102E5C]'}`}>{value}</p>
                  </div>
                ))}
              </div>

              <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-dashed pt-5 ${dark ? 'border-white/10' : 'border-slate-200'}`}>
                <div className={`flex items-center gap-2 text-xs ${dark ? 'text-white/55' : 'text-slate-500'}`}>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Present this ticket at check-in
                </div>
                <span className={`text-xs font-medium ${dark ? 'text-white/40' : 'text-slate-400'}`}>Ticket ID: {registration?.id ? registration.id.slice(0, 8).toUpperCase() : '—'}</span>
              </div>
            </div>

            {/* Check-in panel */}
            <aside className={`border-t p-6 sm:p-8 lg:border-l lg:border-t-0 ${dark ? 'border-white/10 bg-[#091F3A]' : 'border-slate-200 bg-[#F7F9FC]'}`}>
              <div className="flex h-full flex-col">
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.15em] ${dark ? 'text-[#5EA7E8]' : 'text-[#246DB5]'}`}>Race-day check-in</p>
                  <h3 className={`mt-1 font-serif text-2xl font-bold ${dark ? 'text-white' : 'text-[#102E5C]'}`}>Your QR code</h3>
                  <p className={`mt-2 text-sm leading-6 ${dark ? 'text-white/55' : 'text-slate-500'}`}>
                    {ticketReady ? 'Scan this code to open the participant identity linked to this ticket.' : ticketStatus(registration?.payment_status, registration?.status, bib)}
                  </p>
                </div>

                <div className={`my-7 flex aspect-square w-full items-center justify-center rounded-2xl border ${dark ? 'border-white/10 bg-[#102F52]' : 'border-slate-200 bg-white'}`}>
                  {ticketReady ? <TicketQR value={qrValue} /> : <UnavailableQR />}
                </div>

                <div className={`rounded-xl border p-4 ${dark ? 'border-[#2A527D] bg-[#123C70]' : 'border-[#DCE8F4] bg-[#EAF3FB]'}`}>
                  <p className={`text-xs font-bold ${dark ? 'text-white' : 'text-[#102E5C]'}`}>Check-in schedule: TBD</p>
                  <p className={`mt-1 text-xs leading-5 ${dark ? 'text-white/55' : 'text-slate-500'}`}>Final race-day instructions will be published by the event team.</p>
                </div>

                <div className="mt-auto grid gap-2 pt-6">
                  <TicketActions enabled={ticketReady} value={qrValue} name={name} />
                  <Link href="/profile" className="text-sm font-bold text-[#5EA7E8]">View participant profile →</Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Bottom information */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoCard dark={dark} title="What to bring" text="Ticket, identification, water and your race-day essentials." />
          <InfoCard dark={dark} title="Kit collection" text="Collection details will be added here when the schedule is published." />
          <InfoCard dark={dark} title="Need help?" text="Contact the Tour de Dar team if any registration details look incorrect." />
        </div>
      </div>
    </div>
  )
}

function InfoCard({ dark, title, text }: { dark: boolean; title: string; text: string }) {
  return (
    <div className={`rounded-2xl border p-5 ${dark ? 'border-white/10 bg-[#0C2748]' : 'border-slate-200 bg-white'}`}>
      <h3 className={`text-sm font-bold ${dark ? 'text-white' : 'text-[#102E5C]'}`}>{title}</h3>
      <p className={`mt-2 text-xs leading-5 ${dark ? 'text-white/55' : 'text-slate-500'}`}>{text}</p>
    </div>
  )
}

function ticketStatus(payment?: string, status?: string, bib?: string | null) {
  if (!payment) return 'Complete registration before a ticket can be issued.'
  if (payment !== 'paid') return 'Your QR code will appear after payment is confirmed.'
  if (status !== 'confirmed') return 'Your QR code will appear after registration is confirmed.'
  if (!bib) return 'Your QR code will appear after a bib number is assigned.'
  return 'Ticket processing is incomplete.'
}

function TicketQR({ value }: { value: string }) {
  const [src, setSrc] = useState('')
  useEffect(() => { void QRCode.toDataURL(value, { width: 360, margin: 2, errorCorrectionLevel: 'H' }).then(setSrc) }, [value])
  return src ? <img src={src} alt="Scannable participant ticket QR code" className="h-full w-full max-w-[260px] object-contain" /> : <span className="text-xs text-slate-400">Generating secure QR…</span>
}

function TicketActions({ enabled, value, name }: { enabled: boolean; value: string; name: string }) {
  async function download() {
    const src = await QRCode.toDataURL(value, { width: 900, margin: 4, errorCorrectionLevel: 'H' })
    const link = document.createElement('a'); link.href = src; link.download = `tour-de-dar-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-ticket.png`; link.click()
  }
  async function share() {
    if (navigator.share) await navigator.share({ title: 'My Tour de Dar ticket', text: `${name}'s Tour de Dar participant ticket`, url: value })
    else { await navigator.clipboard.writeText(value); window.alert('Ticket link copied to your clipboard.') }
  }
  const cls = 'flex items-center gap-2 rounded-xl border border-current px-3 py-2 text-left text-xs font-bold text-[#5EA7E8] disabled:cursor-not-allowed disabled:opacity-35'
  return <div className="grid grid-cols-3 gap-2 print:hidden"><button type="button" disabled={!enabled} onClick={() => void download()} className={cls}><Download size={14} /> Save</button><button type="button" disabled={!enabled} onClick={() => void share()} className={cls}><Share2 size={14} /> Share</button><button type="button" disabled={!enabled} onClick={() => window.print()} className={cls}><Printer size={14} /> Print</button></div>
}

function UnavailableQR() {
  return (
    <div role="status" className="flex h-32 w-32 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center text-xs font-semibold text-slate-400">QR not available yet</div>
  )
}

function Spinner({ dark }: { dark: boolean }) {
  return (
    <div className={`flex min-h-[50vh] items-center justify-center ${dark ? 'bg-[#071A33]' : 'bg-[#F7F9FC]'}`}>
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#246DB5] border-t-transparent" />
    </div>
  )
}
