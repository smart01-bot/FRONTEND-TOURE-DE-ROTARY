'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Tour de Rotary — PostCard (participant feed)
// ─────────────────────────────────────────────────────────────────────────────

import { MessageCircle } from 'lucide-react'
import { cn, initials, relativeTime } from '@/lib/utils'
import type { FeedPost, ReactionEmoji } from '@/types/feed'

// Deterministic avatar colour from user_id
const AVATAR_COLOURS = ['#1769AA', '#C58A22', '#B12A70', '#2563eb', '#0f766e']

function avatarColour(userId: string): string {
  const code = userId.charCodeAt(0) + userId.charCodeAt(userId.length - 1)
  return AVATAR_COLOURS[code % AVATAR_COLOURS.length]
}

const POST_TYPE_LABELS: Record<string, string> = {
  general:   'Update',
  training:  'Training update',
  milestone: 'Milestone',
  question:  'Question',
  team:      'Team update',
}

const CATEGORY_STYLES: Record<string, string> = {
  olympic: 'bg-[#fdf3e3] text-[#a3670c]',
  sprint:  'bg-[#eff6ff] text-[#2563eb]',
  relay:   'bg-[#fbe9f2] text-[#B12A70]',
}

// Same discipline colours as the Training page
const DISCIPLINE_HEX: Record<string, string> = {
  swim: '#1769AA',
  bike: '#C58A22',
  run:  '#B12A70',
}

const REACTIONS: { emoji: ReactionEmoji; icon: string; label: string }[] = [
  { emoji: 'fire',  icon: '🔥', label: 'Fire'  },
  { emoji: 'heart', icon: '❤️', label: 'Love'  },
  { emoji: 'clap',  icon: '👏', label: 'Clap'  },
]

interface PostCardProps {
  post:          FeedPost
  currentUserId: string | null
  onReact:       (postId: string, emoji: ReactionEmoji) => void
}

export function PostCard({ post, currentUserId, onReact }: PostCardProps) {
  const userReaction = post.reactions.find(r => r.user_id === currentUserId)?.emoji ?? null
  const countFor     = (emoji: ReactionEmoji) => post.reactions.filter(r => r.emoji === emoji).length

  return (
    <article className="rounded-[24px] border border-[#dce5ef] bg-white p-5 shadow-[0_10px_30px_rgba(15,35,63,0.045)] sm:p-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-num text-[12px] font-extrabold text-white"
          style={{ background: avatarColour(post.user_id) }}
          aria-hidden
        >
          {initials(post.full_name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate text-[14px] font-extrabold text-[#10233f]">{post.full_name}</p>
            <span className="shrink-0 text-[10px] font-medium text-[#94a3b8]">
              {relativeTime(post.created_at)}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            {post.category && (
              <span
                className={cn(
                  'rounded-full px-2 py-[3px] font-num text-[9px] font-extrabold uppercase tracking-[0.08em]',
                  CATEGORY_STYLES[post.category] ?? 'bg-[#eff6ff] text-[#2563eb]',
                )}
              >
                {post.category}
              </span>
            )}
            {post.discipline && (
              <span className="flex items-center gap-1.5 text-[11px] font-semibold capitalize text-[#64748b]">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: DISCIPLINE_HEX[post.discipline] }}
                />
                {post.discipline}
              </span>
            )}
            <span className="font-num text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#94a3b8]">
              {POST_TYPE_LABELS[post.post_type] ?? 'Update'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="mt-4 whitespace-pre-wrap break-words text-[13px] leading-6 text-[#475569]">
        {post.content}
      </p>

      {/* Reactions */}
      <div className="mt-4 flex items-center gap-2 border-t border-[#edf1f5] pt-4">
        {REACTIONS.map(({ emoji, icon, label }) => {
          const active = userReaction === emoji
          return (
            <button
              key={emoji}
              type="button"
              onClick={() => onReact(post.id, emoji)}
              aria-label={`${label} this post`}
              aria-pressed={active}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition',
                active
                  ? 'border-[#cfe0f7] bg-[#eff6ff]'
                  : 'border-[#e4eaf1] bg-[#f8fafc] hover:border-[#cbd8e6]',
              )}
            >
              <span className="text-[13px] leading-none">{icon}</span>
              <span
                className={cn(
                  'font-num text-[11px] font-extrabold',
                  active ? 'text-[#2563eb]' : 'text-[#64748b]',
                )}
              >
                {countFor(emoji)}
              </span>
            </button>
          )
        })}

        {post.comment_count > 0 && (
          <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-[#94a3b8]">
            <MessageCircle size={14} />
            {post.comment_count} {post.comment_count === 1 ? 'comment' : 'comments'}
          </span>
        )}
      </div>
    </article>
  )
}
