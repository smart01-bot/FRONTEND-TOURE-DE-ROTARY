'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Tour de Rotary — ComposeCard (participant feed)
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import { ImagePlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PostType, FeedDiscipline } from '@/types/feed'

const POST_TYPES: { value: PostType; label: string }[] = [
  { value: 'general',   label: 'General'   },
  { value: 'training',  label: 'Training'  },
  { value: 'milestone', label: 'Milestone' },
  { value: 'question',  label: 'Question'  },
  { value: 'team',      label: 'Team'      },
]

const DISCIPLINES: { value: FeedDiscipline; label: string; hex: string }[] = [
  { value: 'swim', label: 'Swim', hex: '#1769AA' },
  { value: 'bike', label: 'Bike', hex: '#C58A22' },
  { value: 'run',  label: 'Run',  hex: '#B12A70' },
]

const MAX_CHARS = 500

interface ComposeCardProps {
  avatarInitials: string
  onPost: (content: string, type: PostType, discipline: FeedDiscipline | null) => Promise<void>
}

const pill = (selected: boolean) =>
  cn(
    'flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-num text-[10px] font-extrabold uppercase tracking-[0.08em] transition',
    selected
      ? 'border-[#cfe0f7] bg-[#eff6ff] text-[#2563eb]'
      : 'border-[#dce5ef] bg-white text-[#64748b] hover:border-[#cbd8e6]',
  )

export function ComposeCard({ avatarInitials, onPost }: ComposeCardProps) {
  const [open,       setOpen]       = useState(false)
  const [content,    setContent]    = useState('')
  const [postType,   setPostType]   = useState<PostType>('general')
  const [discipline, setDiscipline] = useState<FeedDiscipline | null>(null)
  const [posting,    setPosting]    = useState(false)
  const [error,      setError]      = useState<string | null>(null)

  const charsLeft = MAX_CHARS - content.length
  const canPost   = content.trim().length > 0 && !posting

  function reset() {
    setContent('')
    setPostType('general')
    setDiscipline(null)
    setError(null)
    setOpen(false)
  }

  async function handlePost() {
    if (!canPost) return
    setPosting(true)
    setError(null)
    try {
      await onPost(content, postType, discipline)
      reset()
    } catch {
      setError("Couldn't post right now. Please try again.")
    } finally {
      setPosting(false)
    }
  }

  const avatar = (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dbe7f4] bg-[#eff6ff] font-num text-[12px] font-extrabold text-[#2563eb]"
      aria-hidden
    >
      {avatarInitials}
    </div>
  )

  return (
    <div className="rounded-[24px] border border-[#dce5ef] bg-white p-4 shadow-[0_12px_35px_rgba(15,35,63,0.06)] sm:p-5">
      {!open ? (
        <div className="flex items-center gap-3">
          {avatar}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex-1 rounded-full border border-[#e4eaf1] bg-[#f8fafc] px-4 py-3 text-left text-[13px] text-[#94a3b8] transition hover:border-[#cbd8e6]"
          >
            Share a training update…
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-3">
            {avatar}
            <textarea
              autoFocus
              value={content}
              onChange={e => setContent(e.target.value.slice(0, MAX_CHARS))}
              placeholder="What's on your mind? Training tips, milestones, nerves — all welcome."
              rows={4}
              aria-label="Write a post"
              className="min-h-[104px] flex-1 resize-none rounded-[16px] border border-[#dbe7f4] bg-[#f7faff] p-4 text-[13px] leading-6 text-[#10233f] outline-none transition placeholder:text-[#94a3b8] focus:border-[#2563eb]"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {POST_TYPES.map(pt => (
              <button
                key={pt.value}
                type="button"
                onClick={() => setPostType(pt.value)}
                aria-pressed={postType === pt.value}
                className={pill(postType === pt.value)}
              >
                {pt.label}
              </button>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {DISCIPLINES.map(d => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDiscipline(prev => (prev === d.value ? null : d.value))}
                aria-pressed={discipline === d.value}
                className={pill(discipline === d.value)}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.hex }} />
                {d.label}
              </button>
            ))}
          </div>

          <button type="button" disabled title="Photo uploads are not available yet" className="mt-3 flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-[#dce5ef] px-3 py-2 text-[10px] font-bold text-[#94a3b8]">
            <ImagePlus size={14} /> Photos coming soon
          </button>

          {error && (
            <p role="alert" className="mt-3 text-[12px] font-semibold text-[#d85b4d]">
              {error}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-[#edf1f5] pt-4">
            <span
              className={cn(
                'font-num text-[11px] font-extrabold',
                charsLeft < 50 ? 'text-[#d85b4d]' : 'text-[#94a3b8]',
              )}
            >
              {charsLeft}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={reset}
                className="rounded-[12px] px-4 py-2.5 text-[12px] font-bold text-[#64748b] transition hover:text-[#10233f]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePost}
                disabled={!canPost}
                className={cn(
                  'rounded-[12px] px-5 py-2.5 text-[12px] font-extrabold transition',
                  canPost
                    ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                    : 'cursor-not-allowed bg-[#eaf0f6] text-[#94a3b8]',
                )}
              >
                {posting ? 'Posting…' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
