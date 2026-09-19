'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Tour de Rotary — PostCard (participant feed)
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import { Flag, MessageCircle, Pencil, Trash2, X } from 'lucide-react'
import { cn, initials, relativeTime } from '@/lib/utils'
import { createComment, getPostComments } from '@/lib/supabase/feed'
import type { FeedPost, PostComment, ReactionEmoji } from '@/types/feed'

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
  onUpdate:      (postId: string, content: string) => Promise<void>
  onDelete:      (postId: string) => Promise<void>
}

export function PostCard({ post, currentUserId, onReact, onUpdate, onDelete }: PostCardProps) {
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comments, setComments] = useState<PostComment[]>([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [commentError, setCommentError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(post.content)
  const [reported, setReported] = useState(false)
  const owner = currentUserId === post.user_id
  const userReaction = post.reactions.find(r => r.user_id === currentUserId)?.emoji ?? null
  const countFor     = (emoji: ReactionEmoji) => post.reactions.filter(r => r.emoji === emoji).length

  async function openComments() {
    setCommentsOpen(true); setCommentsLoading(true); setCommentError(null)
    try { setComments(await getPostComments(post.id)) } catch { setCommentError('Comments could not be loaded.') } finally { setCommentsLoading(false) }
  }

  async function submitComment() {
    if (!commentText.trim()) return
    try { await createComment(post.id, commentText); setCommentText(''); setComments(await getPostComments(post.id)) } catch { setCommentError('Your comment could not be posted.') }
  }

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
        {editing ? <textarea value={draft} onChange={event => setDraft(event.target.value.slice(0, 500))} rows={3} className="w-full resize-none rounded-xl border border-[#dbe7f4] bg-[#f7faff] p-3 outline-none focus:border-[#2563eb]" /> : post.content}
      </p>

      {owner && <div className="mt-3 flex gap-3 text-[10px] font-bold text-[#64748b]">
        {editing ? <><button type="button" onClick={async () => { await onUpdate(post.id, draft); setEditing(false) }} className="text-[#2563eb]">Save changes</button><button type="button" onClick={() => { setDraft(post.content); setEditing(false) }}>Cancel</button></> : <button type="button" onClick={() => setEditing(true)} className="flex items-center gap-1"><Pencil size={12} /> Edit</button>}
        <button type="button" onClick={() => { if (window.confirm('Delete this post?')) void onDelete(post.id) }} className="flex items-center gap-1 text-[#b6453a]"><Trash2 size={12} /> Delete</button>
      </div>}

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

        <button type="button" onClick={() => void openComments()} className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-[#64748b]">
            <MessageCircle size={14} />
            {post.comment_count} {post.comment_count === 1 ? 'comment' : 'comments'}
        </button>
        {!owner && <button type="button" onClick={() => setReported(true)} disabled={reported} title="Reporting is recorded on this device while moderation services are being connected" className="flex items-center gap-1 text-[10px] font-semibold text-[#94a3b8] disabled:text-[#b6453a]"><Flag size={13} /> {reported ? 'Reported' : 'Report'}</button>}
      </div>

      {commentsOpen && <div className="mt-4 rounded-[18px] border border-[#e4eaf1] bg-[#f8fafc] p-4">
        <div className="flex items-center justify-between"><h3 className="text-[12px] font-extrabold text-[#10233f]">Comments</h3><button type="button" onClick={() => setCommentsOpen(false)} aria-label="Close comments"><X size={16} /></button></div>
        {commentsLoading ? <p className="mt-4 text-[11px] text-[#94a3b8]">Loading comments…</p> : comments.length === 0 ? <p className="mt-4 text-[11px] text-[#94a3b8]">No comments yet. Start the conversation.</p> : <div className="mt-4 space-y-3">{comments.map(comment => <div key={comment.id} className="rounded-xl bg-white p-3"><div className="flex justify-between gap-3"><strong className="text-[11px] text-[#10233f]">{comment.full_name}</strong><span className="text-[9px] text-[#94a3b8]">{relativeTime(comment.created_at)}</span></div><p className="mt-1 whitespace-pre-wrap break-words text-[11px] leading-5 text-[#475569]">{comment.content}</p></div>)}</div>}
        {commentError && <p role="alert" className="mt-3 text-[10px] font-semibold text-[#b6453a]">{commentError}</p>}
        <div className="mt-4 flex gap-2"><input value={commentText} onChange={event => setCommentText(event.target.value.slice(0, 300))} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void submitComment() } }} placeholder="Write a comment" aria-label="Write a comment" className="min-w-0 flex-1 rounded-full border border-[#dbe7f4] bg-white px-4 py-2.5 text-[11px] outline-none focus:border-[#2563eb]" /><button type="button" onClick={() => void submitComment()} disabled={!commentText.trim()} className="rounded-full bg-[#2563eb] px-4 text-[10px] font-bold text-white disabled:opacity-40">Post</button></div>
      </div>}
    </article>
  )
}
