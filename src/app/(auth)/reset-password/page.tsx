'use client'

import { useState } from 'react'
import Link from 'next/link'
import { sendPasswordReset } from '@/lib/supabase/auth'

const inp = [
  'w-full bg-white border-[1.5px] border-[#0D1B3D]/50 rounded-[12px]',
  'px-4 py-[15px] font-sans text-body text-[#0D1B3D]',
  'placeholder:text-[#0D1B3D]/70',
  'focus:outline-none focus:border-[#9F2B68] focus:ring-4 focus:ring-[#9F2B68]/10',
  'transition-all duration-200',
].join(' ')

const lbl = 'block font-num font-extrabold text-[10px] text-[#0D1B3D]/70 uppercase tracking-[.08em] mb-[9px]'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    const trimmedEmail = email.trim()
    if (!trimmedEmail) { setError('Please enter your email address.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) { setError('Enter a valid email address.'); return }
    setLoading(true)
    setError(null)
    const { error: e } = await sendPasswordReset(trimmedEmail)
    if (e) { setError(e); setLoading(false); return }
    setSent(true)
    setLoading(false)
  }

  if (sent) return (
    <div className="w-full px-6 pb-10 animate-fade-up">
      <div className="mt-6 rounded-[18px] border-[1.5px] border-[#3F78B5]/20 bg-[#3F78B5]/[.05] p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#9F2B68]/[.10]">
          <svg className="h-7 w-7 text-[#9F2B68]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div role="status" aria-live="polite">
          <h2 className="mb-2 font-serif text-[28px] font-bold italic tracking-[-0.02em] text-[#0D1B3D]">Check your inbox.</h2>
          <p className="mb-6 font-sans text-[13px] leading-relaxed text-[#0D1B3D]/70">
            Reset link sent to <span className="font-semibold text-[#9F2B68]">{email.trim()}</span>.
          </p>
          <p className="mb-6 font-sans text-[12px] leading-relaxed text-[#0D1B3D]/60">
            Follow the instructions in the email to continue.
          </p>
        </div>
        <Link href="/login" className="font-sans text-[13px] font-semibold text-[#9F2B68] transition-opacity hover:opacity-80">
          Back to sign in →
        </Link>
      </div>
    </div>
  )

  return (
    <form
      className="w-full px-6 pb-10 animate-fade-up"
      onSubmit={event => { event.preventDefault(); void handleSubmit() }}
      noValidate
      aria-busy={loading}
    >
      <h2 className="mb-[6px] font-serif text-[32px] font-bold italic leading-[1.08] tracking-[-0.02em] text-[#0D1B3D]">
        Reset your password.
      </h2>
      <p className="mb-[26px] font-sans text-[13px] leading-relaxed text-[#0D1B3D]/70">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <div className="mb-5">
        <label htmlFor="reset-email" className={lbl}>Email</label>
        <input
          id="reset-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={event => setEmail(event.target.value)}
          disabled={loading}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'reset-error' : undefined}
          className={inp}
        />
      </div>

      {error && (
        <div id="reset-error" role="alert" className="mb-5 rounded-[12px] border border-[#9F2B68]/25 bg-[#9F2B68]/[.07] px-4 py-3">
          <p className="font-sans text-[13px] text-[#9F2B68]">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-[12px] bg-[#FFC62E] py-4 font-sans text-[14px] font-extrabold text-[#0D1B3D]
                   transition-all duration-200 hover:brightness-95 active:scale-[.98]
                   disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none"
      >
        {loading
          ? <span className="flex items-center justify-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0D1B3D]/30 border-t-[#0D1B3D]" />Sending…</span>
          : 'Send reset link'}
      </button>

      <p className="mt-6 text-center">
        <Link href="/login" className="font-sans text-[13px] font-semibold text-[#9F2B68] transition-opacity hover:opacity-80">
          ← Back to sign in
        </Link>
      </p>
    </form>
  )
}
