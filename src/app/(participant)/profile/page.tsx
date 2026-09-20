'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { User, Phone, Trophy, BookOpen, LogOut, Check, ChevronRight, Eye, EyeOff, Camera, Users, Target, Medal } from 'lucide-react'
import { useParticipant } from '@/hooks/useParticipant'
import { useUser } from '@/hooks/useUser'
import { updateMyProfile } from '@/lib/supabase/participant'
import { updateMyStory } from '@/lib/supabase/stories'
import { ParticipantActivity } from '@/components/community/ParticipantActivity'
import { CATEGORY_MAP } from '@/config/categories'
import { initials, cn } from '@/lib/utils'

const STORY_MAX = 200

export default function ProfilePage() {
  const { profile, registration, loading } = useParticipant()
  const { user, signOut } = useUser()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const initialized = useRef(false)

  const [storyText, setStoryText] = useState('')
  const [storyPublic, setStoryPublic] = useState(true)
  const [storySaving, setStorySaving] = useState(false)
  const [storyStatus, setStoryStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const storyInitialized = useRef(false)

  useEffect(() => {
    if (profile && !initialized.current) {
      setFullName(profile.full_name ?? '')
      setPhone(profile.phone ?? '')
      initialized.current = true
    }
  }, [profile])

  useEffect(() => {
    if (registration && !storyInitialized.current) {
      setStoryText(registration.story ?? '')
      setStoryPublic(registration.story_public ?? false)
      storyInitialized.current = true
    }
  }, [registration])

  if (loading) return <Spinner />

  const category = registration?.category ? CATEGORY_MAP[registration.category] : null
  const bib = registration?.bib_number
  const avi = initials(profile?.full_name ?? user?.email ?? '?')
  const dirty = fullName !== (profile?.full_name ?? '') || phone !== (profile?.phone ?? '')

  const storyDirty =
    storyText !== (registration?.story ?? '') || storyPublic !== (registration?.story_public ?? false)
  const storyOverLimit = storyText.length > STORY_MAX

  async function handleSave() {
    if (!user || !dirty) return
    setSaving(true)
    setStatus('idle')
    const { error } = await updateMyProfile(user.id, {
      full_name: fullName.trim() || null,
      phone: phone.trim() || null,
    })
    setSaving(false)
    setStatus(error ? 'error' : 'saved')
    if (!error) setTimeout(() => setStatus('idle'), 2500)
  }

  async function handleSaveStory() {
    if (!user || !storyDirty || storyOverLimit) return
    setStorySaving(true)
    setStoryStatus('idle')
    const { error } = await updateMyStory(user.id, {
      story: storyText,
      story_public: storyPublic,
    })
    setStorySaving(false)
    setStoryStatus(error ? 'error' : 'saved')
    if (!error) setTimeout(() => setStoryStatus('idle'), 2500)
  }

  return (
    <div className="participant-profile min-h-dvh bg-[#f5f7fb] px-5 pb-10 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-[1120px] pt-7 lg:pt-9">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-sans text-[10px] font-extrabold uppercase tracking-[.16em] text-[#2456a6]">
              Participant portal
            </p>
            <h1 className="font-serif text-[34px] font-bold italic leading-none tracking-[-.03em] text-[#101d35]">
              Your profile.
            </h1>
            <p className="mt-2 font-sans text-[13px] text-[#718096]">
              Keep your participant details up to date.
            </p>
          </div>
          {bib && (
            <div className="hidden rounded-2xl border border-[#dfe6f0] bg-white px-4 py-3 text-right shadow-[0_8px_30px_rgba(16,29,53,.05)] sm:block">
              <div className="font-sans text-[9px] font-extrabold uppercase tracking-[.12em] text-[#8b98aa]">Race bib</div>
              <div className="mt-0.5 font-sans text-[20px] font-extrabold text-[#101d35]">#{bib}</div>
            </div>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
          <section className="overflow-hidden rounded-[24px] border border-[#e1e7f0] bg-white shadow-[0_12px_40px_rgba(16,29,53,.06)]">
            <div className="border-b border-[#edf0f5] px-5 py-5 sm:px-7">
              <div className="flex items-center gap-4">
                <div className="relative flex h-[64px] w-[64px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-[#eaf1fb] ring-1 ring-[#d8e5f6]">
                  {profile?.avatar_url ? <img src={profile.avatar_url} alt={`${profile.full_name ?? 'Participant'} profile`} className="h-full w-full object-cover" /> : <span className="font-serif text-[23px] font-bold italic text-[#2456a6]">{avi}</span>}
                </div>
                <button type="button" disabled title="Photo uploads will be enabled after secure media storage is configured" className="flex cursor-not-allowed items-center gap-1.5 rounded-full border border-[#dfe6f0] px-3 py-2 text-[10px] font-bold text-[#8b98aa]"><Camera size={13} /> Photo upload coming soon</button>
                <div className="min-w-0">
                  <h2 className="truncate font-sans text-[18px] font-extrabold text-[#101d35]">
                    {profile?.full_name || 'Participant'}
                  </h2>
                  <p className="mt-1 font-sans text-[11px] text-[#7b8798]">
                    {[category?.name, 'Individual', bib ? `Bib #${bib}` : null].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf3fb] text-[#2456a6]"><User size={15} /></div>
                <div>
                  <h3 className="font-sans text-[13px] font-extrabold text-[#101d35]">Personal details</h3>
                  <p className="font-sans text-[10px] text-[#8a96a7]">These details are used for your participant record.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <input type="text" value={fullName} onChange={e => { setFullName(e.target.value); setStatus('idle') }} placeholder="Your full name" className={inputClass} />
                </Field>
                <Field label="Phone">
                  <div className="relative">
                    <Phone size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa6b6]" />
                    <input type="tel" value={phone} onChange={e => { setPhone(e.target.value); setStatus('idle') }} placeholder="+255 7XX XXX XXX" className={cn(inputClass, 'pl-11')} />
                  </div>
                </Field>
              </div>

              <button type="button" onClick={handleSave} disabled={!dirty || saving} className={cn('mt-1 flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#2456a6] py-[13px] font-sans text-[12px] font-extrabold text-white transition-all hover:bg-[#1e4b93] sm:w-auto sm:px-7', (!dirty || saving) && 'cursor-not-allowed opacity-40')}>
                {status === 'saved' ? <><Check size={15} /> Saved</> : saving ? 'Saving…' : 'Save changes'}
              </button>
              {status === 'error' && <p className="mt-3 font-sans text-[11px] font-semibold text-[#d85b4d]">Something went wrong. Try again.</p>}
            </div>

            {registration && (
              <div className="border-t border-[#edf0f5] p-5 sm:p-7">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf3fb] text-[#2456a6]"><BookOpen size={15} /></div>
                  <div>
                    <h3 className="font-sans text-[13px] font-extrabold text-[#101d35]">Why are you doing this?</h3>
                    <p className="font-sans text-[10px] text-[#8a96a7]">Your reason for racing — shown to donors and, if public, on tourdedar.co.tz/stories.</p>
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={storyText}
                  onChange={e => { setStoryText(e.target.value); setStoryStatus('idle') }}
                  placeholder="I race for my mother. She was treated at Ocean Road. She's still here. So am I."
                  aria-label="Why are you doing this?"
                  className="w-full resize-none rounded-[13px] border border-[#dfe5ed] bg-[#f9fafc] p-4 font-serif text-[14px] italic leading-[1.6] text-[#18263e] outline-none transition-colors placeholder:not-italic placeholder:text-[#aab3c0] focus:border-[#7da2d4] focus:bg-white focus:ring-2 focus:ring-[#2456a6]/10"
                />
                <div className="mt-1.5 flex justify-end">
                  <span className={cn('font-num text-[11px] font-extrabold', storyOverLimit ? 'text-[#d85b4d]' : 'text-[#9aa6b6]')}>
                    {storyOverLimit ? `${storyText.length - STORY_MAX} over` : `${STORY_MAX - storyText.length} left`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => { setStoryPublic(p => !p); setStoryStatus('idle') }}
                  aria-pressed={storyPublic}
                  className="mt-3 flex w-full items-center justify-between gap-3 rounded-[13px] border border-[#dfe5ed] bg-[#f9fafc] px-4 py-3 text-left transition-colors hover:border-[#c9d4e2]"
                >
                  <span className="flex items-center gap-2.5">
                    {storyPublic ? <Eye size={15} className="text-[#2456a6]" /> : <EyeOff size={15} className="text-[#9aa6b6]" />}
                    <span className="font-sans text-[12px] font-bold text-[#18263e]">
                      {storyPublic ? 'Visible on the public stories page' : 'Kept private'}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                      storyPublic ? 'bg-[#2456a6]' : 'bg-[#d5dbe4]',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
                        storyPublic ? 'translate-x-[22px]' : 'translate-x-0.5',
                      )}
                    />
                  </span>
                </button>
                <p className="mt-2 font-sans text-[10px] leading-5 text-[#8a96a7]">
                  This setting controls the public story listing, including your name, category and story. A broader participant profile is not published because separate profile, photo, activity and bib consent controls are not yet available.
                </p>

                <button
                  type="button"
                  onClick={handleSaveStory}
                  disabled={!storyDirty || storyOverLimit || storySaving}
                  className={cn(
                    'mt-4 flex w-full items-center justify-center gap-2 rounded-[13px] bg-[#2456a6] py-[13px] font-sans text-[12px] font-extrabold text-white transition-all hover:bg-[#1e4b93] sm:w-auto sm:px-7',
                    (!storyDirty || storyOverLimit || storySaving) && 'cursor-not-allowed opacity-40',
                  )}
                >
                  {storyStatus === 'saved' ? <><Check size={15} /> Saved</> : storySaving ? 'Saving…' : 'Save story'}
                </button>
                {storyStatus === 'error' && <p className="mt-3 font-sans text-[11px] font-semibold text-[#d85b4d]">Something went wrong. Try again.</p>}
              </div>
            )}
          </section>

          <aside className="space-y-5">
            <section className="rounded-[24px] border border-[#e1e7f0] bg-white p-5 shadow-[0_12px_40px_rgba(16,29,53,.05)]">
              <div className="mb-4 flex items-center gap-2">
                <Trophy size={16} className="text-[#2456a6]" />
                <h3 className="font-sans text-[12px] font-extrabold text-[#101d35]">Race registration</h3>
              </div>
              <InfoRow label="Category" value={category?.name ?? '—'} />
              <InfoRow label="Discipline" value={registration?.discipline ?? 'All three'} capitalize />
              <InfoRow label="Bib number" value={bib ? `#${bib}` : 'Not assigned'} />
              <InfoRow label="Registration" value={registration ? 'Registered' : 'Not registered'} last />
              <Link href="/ticket" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-[13px] border border-[#dfe6f0] px-4 font-sans text-[10px] font-extrabold text-[#2456a6]">
                View digital ticket and bib
              </Link>
              <Link href="/results" className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[13px] border border-[#dfe6f0] px-4 font-sans text-[10px] font-extrabold text-[#2456a6]">
                <Medal size={14} /> Results and memories
              </Link>
            </section>

            <section className="rounded-[24px] border border-[#e1e7f0] bg-white p-5 shadow-[0_12px_40px_rgba(16,29,53,.05)]">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-[#2456a6]" />
                <h3 className="font-sans text-[12px] font-extrabold text-[#101d35]">Your race story</h3>
              </div>
              {registration?.story ? (
                <p className="font-serif text-[14px] font-bold italic leading-[1.55] text-[#4e5d71]">“{registration.story}”</p>
              ) : (
                <p className="font-sans text-[11px] leading-5 text-[#929dad]">No story added yet.</p>
              )}
              <div className="mt-4 flex items-center gap-1.5 font-sans text-[10px] font-extrabold uppercase tracking-[.08em] text-[#2456a6]">
                Fundraising story <ChevronRight size={13} />
              </div>
            </section>

            <section className="rounded-[24px] border border-[#e1e7f0] bg-white p-5 shadow-[0_12px_40px_rgba(16,29,53,.05)]">
              <h3 className="font-sans text-[12px] font-extrabold text-[#101d35]">Community spaces</h3>
              <p className="mt-1 font-sans text-[10px] leading-5 text-[#8a96a7]">Team membership and challenge completion require approved backend contracts. No activity is assumed.</p>
              <div className="mt-4 grid gap-2">
                <Link href="/teams" className="flex min-h-11 items-center justify-between rounded-[13px] border border-[#dfe6f0] px-4 font-sans text-[11px] font-bold text-[#26354d]">
                  <span className="flex items-center gap-2"><Users size={14} className="text-[#2456a6]" /> Teams</span>
                  <ChevronRight size={14} className="text-[#9aa6b6]" />
                </Link>
                <Link href="/challenges" className="flex min-h-11 items-center justify-between rounded-[13px] border border-[#dfe6f0] px-4 font-sans text-[11px] font-bold text-[#26354d]">
                  <span className="flex items-center gap-2"><Target size={14} className="text-[#2456a6]" /> Challenges</span>
                  <ChevronRight size={14} className="text-[#9aa6b6]" />
                </Link>
              </div>
            </section>

            <button type="button" onClick={() => signOut()} className="flex w-full items-center justify-center gap-2 rounded-[15px] border border-[#ead8d5] bg-white py-[13px] font-sans text-[11px] font-extrabold text-[#c45c51] transition-colors hover:bg-[#fff7f6]">
              <LogOut size={14} /> Sign out
            </button>
          </aside>
        </div>

        {user && <ParticipantActivity userId={user.id} />}
      </div>
    </div>
  )
}

const inputClass = 'w-full rounded-[13px] border border-[#dfe5ed] bg-[#f9fafc] px-4 py-[13px] font-sans text-[13px] font-semibold text-[#18263e] outline-none transition-colors placeholder:text-[#aab3c0] focus:border-[#7da2d4] focus:bg-white focus:ring-2 focus:ring-[#2456a6]/10'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="mb-2 block font-sans text-[9px] font-extrabold uppercase tracking-[.12em] text-[#8995a6]">{label}</label>{children}</div>
}

function InfoRow({ label, value, capitalize, last }: { label: string; value: string; capitalize?: boolean; last?: boolean }) {
  return <div className={cn('flex items-center justify-between gap-4 py-3', !last && 'border-b border-[#eef1f5]')}><span className="font-sans text-[10px] font-semibold text-[#8995a6]">{label}</span><span className={cn('text-right font-sans text-[11px] font-extrabold text-[#26354d]', capitalize && 'capitalize')}>{value}</span></div>
}

function Spinner() {
  return <div className="flex min-h-[50vh] items-center justify-center"><div className="h-5 w-5 animate-spin rounded-full border-2 border-[#2456a6] border-t-transparent" /></div>
}
