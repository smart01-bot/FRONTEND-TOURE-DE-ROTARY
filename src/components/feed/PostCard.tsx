'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Tour de Rotary — PostCard (participant feed)
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import { useEffect, useState } from 'react'
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

const COMMENT_MAX = 300

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
  const [commentSubmitting, setCommentSubmitting] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [commentsError, setCommentsError] = useState<string | null>(null)
  const [commentSubmitError, setCommentSubmitError] = useState<string | null>(null)
  const [commentCount, setCommentCount] = useState(post.comment_count)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(post.content)
  const [postSaving, setPostSaving] = useState(false)
  const [postDeleting, setPostDeleting] = useState(false)
  const [postActionError, setPostActionError] = useState<string | null>(null)
  const [reportingOpen, setReportingOpen] = useState(false)
  const owner = currentUserId === post.user_id
  const userReaction = post.reactions.find(r => r.user_id === currentUserId)?.emoji ?? null
  const countFor     = (emoji: ReactionEmoji) => post.reactions.filter(r => r.emoji === emoji).length

  useEffect(() => setCommentCount(post.comment_count), [post.comment_count])

  async function loadComments() {
    setCommentsLoading(true)
    setCommentsError(null)
    try {
      const nextComments = await getPostComments(post.id)
      setComments(nextComments)
      setCommentCount(nextComments.length)
    } catch {
      setCommentsError('Comments could not be loaded. Check your connection and try again.')
    } finally {
      setCommentsLoading(false)
    }
  }

  async function openComments() {
    setCommentsOpen(true)
    await loadComments()
  }

  async function submitComment() {
    const content = commentText.trim()
    if (!content || commentSubmitting) return
    if (!currentUserId) {
      setCommentSubmitError('Sign in as a participant to comment.')
      return
    }

    setCommentSubmitting(true)
    setCommentSubmitError(null)
    try {
      await createComment(post.id, content)
      setCommentText('')
      const nextComments = await getPostComments(post.id)
      setComments(nextComments)
      setCommentCount(nextComments.length)
    } catch {
      setCommentSubmitError('Your comment could not be posted. It was not saved; please try again.')
    } finally {
      setCommentSubmitting(false)
    }
  }

  async function savePost() {
    const content = draft.trim()
    if (!content || postSaving) return
    setPostSaving(true)
    setPostActionError(null)
    try {
      await onUpdate(post.id, content)
      setEditing(false)
    } catch {
      setPostActionError('Your changes could not be saved. The original post is still available.')
    } finally {
      setPostSaving(false)
    }
  }

  async function removePost() {
    if (postDeleting || !window.confirm('Delete this post?')) return
    setPostDeleting(true)
    setPostActionError(null)
    try {
      await onDelete(post.id)
    } catch {
      setPostActionError('The post could not be deleted. Please try again.')
    } finally {
      setPostDeleting(false)
    }
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
        {editing ? <><button type="button" onClick={() => void savePost()} disabled={!draft.trim() || postSaving} className="min-h-11 text-[#2563eb] disabled:opacity-40">{postSaving ? 'Saving…' : 'Save changes'}</button><button type="button" disabled={postSaving} onClick={() => { setDraft(post.content); setEditing(false); setPostActionError(null) }} className="min-h-11 disabled:opacity-40">Cancel</button></> : <button type="button" onClick={() => { setEditing(true); setPostActionError(null) }} className="flex min-h-11 items-center gap-1"><Pencil size={12} /> Edit</button>}
        <button type="button" disabled={postDeleting || postSaving} onClick={() => void removePost()} className="flex min-h-11 items-center gap-1 text-[#b6453a] disabled:opacity-40"><Trash2 size={12} /> {postDeleting ? 'Deleting…' : 'Delete'}</button>
      </div>}
      {postActionError && <p role="alert" className="mt-2 text-[10px] font-semibold text-[#b6453a]">{postActionError}</p>}

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

        <button type="button" onClick={() => void openComments()} aria-expanded={commentsOpen} aria-controls={`comments-${post.id}`} className="ml-auto flex min-h-11 items-center gap-1.5 text-[11px] font-semibold text-[#64748b]">
            <MessageCircle size={14} />
            {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </button>
        {!owner && <button type="button" onClick={() => setReportingOpen(open => !open)} aria-expanded={reportingOpen} aria-controls={`reporting-${post.id}`} className="flex min-h-11 items-center gap-1 text-[10px] font-semibold text-[#94a3b8]"><Flag size={13} /> Report</button>}
      </div>

      {reportingOpen && (
        <div id={`reporting-${post.id}`} role="status" className="mt-4 rounded-[16px] border border-[#f0c9c5] bg-[#fff8f6] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-extrabold text-[#10233f]">Reporting is not connected yet.</p>
              <p className="mt-1 text-[10px] leading-5 text-[#64748b]">No report has been submitted. The moderation service and access policies must be approved before this action can safely store a report.</p>
              <Link href="/community-guidelines" className="mt-2 inline-flex min-h-11 items-center text-[10px] font-bold text-[#2563eb] underline underline-offset-4">Read guidelines and urgent-contact information</Link>
            </div>
            <button type="button" onClick={() => setReportingOpen(false)} aria-label="Close reporting information" className="flex h-11 w-11 shrink-0 items-center justify-center text-[#64748b]"><X size={16} /></button>
          </div>
        </div>
      )}

      {commentsOpen && <div id={`comments-${post.id}`} className="mt-4 rounded-[18px] border border-[#e4eaf1] bg-[#f8fafc] p-4">
        <div className="flex items-center justify-between"><h3 className="text-[12px] font-extrabold text-[#10233f]">Comments</h3><button type="button" onClick={() => setCommentsOpen(false)} aria-label="Close comments" className="flex h-11 w-11 items-center justify-center"><X size={16} /></button></div>
        {commentsLoading ? <p role="status" className="mt-4 text-[11px] text-[#94a3b8]">Loading comments…</p> : commentsError && comments.length === 0 ? <div role="alert" className="mt-4"><p className="text-[10px] font-semibold text-[#b6453a]">{commentsError}</p><button type="button" onClick={() => void loadComments()} className="mt-2 min-h-11 text-[10px] font-bold text-[#2563eb] underline underline-offset-4">Try loading comments again</button></div> : comments.length === 0 ? <p className="mt-4 text-[11px] text-[#94a3b8]">No comments yet. Start the conversation.</p> : <div className="mt-4 space-y-3">{comments.map(comment => <div key={comment.id} className="rounded-xl bg-white p-3"><div className="flex justify-between gap-3"><strong className="min-w-0 break-words text-[11px] text-[#10233f]">{comment.full_name}</strong><span className="shrink-0 text-[9px] text-[#94a3b8]">{relativeTime(comment.created_at)}</span></div><p className="mt-1 whitespace-pre-wrap break-words text-[11px] leading-5 text-[#475569]">{comment.content}</p></div>)}</div>}
        {commentsError && comments.length > 0 && <p role="alert" className="mt-3 text-[10px] font-semibold text-[#b6453a]">{commentsError}</p>}
        {commentSubmitError && <p role="alert" className="mt-3 text-[10px] font-semibold text-[#b6453a]">{commentSubmitError}</p>}
        <div className="mt-4 flex gap-2"><input value={commentText} maxLength={COMMENT_MAX} onChange={event => { setCommentText(event.target.value); setCommentSubmitError(null) }} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void submitComment() } }} placeholder="Write a comment" aria-label="Write a comment" disabled={commentSubmitting || !currentUserId} className="min-w-0 flex-1 rounded-full border border-[#dbe7f4] bg-white px-4 py-2.5 text-[11px] outline-none focus:border-[#2563eb] disabled:cursor-not-allowed disabled:opacity-60" /><button type="button" onClick={() => void submitComment()} disabled={!commentText.trim() || commentSubmitting || !currentUserId} className="min-h-11 rounded-full bg-[#2563eb] px-4 text-[10px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">{commentSubmitting ? 'Posting…' : 'Post'}</button></div>
        <div className="mt-1 flex items-center justify-between gap-3 text-[9px] text-[#94a3b8]"><span>{currentUserId ? 'Press Enter to post.' : 'Sign in to comment.'}</span><span className="font-num font-bold">{COMMENT_MAX - commentText.length}</span></div>
      </div>}
    </article>
  )
}
