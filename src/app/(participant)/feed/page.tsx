'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Tour de Rotary — The Run-Up · Community Feed
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import { CalendarDays, MessageSquare, ShieldCheck, Target, Users } from 'lucide-react'
import { useFeed } from '@/hooks/useFeed'
import { useParticipant } from '@/hooks/useParticipant'
import { initials } from '@/lib/utils'
import { PostCard } from '@/components/feed/PostCard'
import { ComposeCard } from '@/components/feed/ComposeCard'
import type { PostType, FeedDiscipline } from '@/types/feed'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'

export default function FeedPage() {
  const { profile, daysUntil } = useParticipant()
  const { posts, loading, error, currentUserId, reload, createPost, toggleReaction, updatePost, deletePost } = useFeed()

  const avatarInitials = profile?.full_name ? initials(profile.full_name) : '?'

  async function handlePost(content: string, postType: PostType, discipline: FeedDiscipline | null) {
    if (ACTIVE_LIFECYCLE.community.state === 'read_only') {
      throw new Error(ACTIVE_LIFECYCLE.community.explanation)
    }
    await createPost({ content, post_type: postType, discipline })
  }

  return (
    <div className="participant-feed min-h-full bg-[#f6f8fb] text-[#10233f]">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-12 sm:px-7 lg:px-10 lg:pb-14">
        {/* Page heading */}
        <header className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-end sm:justify-between lg:pt-9">
          <div>
            <p className="mb-2 font-num text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2563eb]">
              Community
            </p>
            <h1 className="font-serif text-[32px] font-bold leading-none tracking-[-0.035em] text-[#10233f] sm:text-[38px]">
              The Run-Up.
            </h1>
            <p className="mt-3 max-w-[560px] text-[13px] leading-6 text-[#64748b]">
              {ACTIVE_LIFECYCLE.community.state === 'read_only'
                ? 'Stories and updates from this event edition remain available to read.'
                : 'Training updates, milestones and questions from fellow athletes on the road to race day.'}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#dbe4ef] bg-white px-3 py-2 shadow-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
              <MessageSquare size={14} strokeWidth={2.5} />
            </span>
            <div className="pr-1">
              <p className="font-num text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#94a3b8]">
                Posts
              </p>
              <p className="font-num text-[13px] font-extrabold text-[#10233f]">{posts.length}</p>
            </div>
          </div>
        </header>

        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Community sections">
          <Link href="/teams" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#dbe4ef] bg-white px-4 text-[10px] font-extrabold text-[#2563eb] shadow-sm">
            <Users size={14} /> Teams
          </Link>
          <Link href="/challenges" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#dbe4ef] bg-white px-4 text-[10px] font-extrabold text-[#2563eb] shadow-sm">
            <Target size={14} /> Challenges
          </Link>
          <Link href="/community-guidelines" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#dbe4ef] bg-white px-4 text-[10px] font-extrabold text-[#64748b] shadow-sm">
            <ShieldCheck size={14} /> Guidelines
          </Link>
        </nav>

        <section className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)] lg:items-start">
          {/* Compose + posts */}
          <div className="space-y-5">
            <ComposeCard
              avatarInitials={avatarInitials}
              onPost={handlePost}
              readOnlyReason={ACTIVE_LIFECYCLE.community.state === 'read_only' ? ACTIVE_LIFECYCLE.community.explanation : undefined}
            />

            {loading ? (
              <Spinner />
            ) : error ? (
              <div role="alert" className="rounded-[24px] border border-[#f0c9c5] bg-white px-6 py-10 text-center">
                <p className="text-[13px] font-semibold text-[#b6453a]">The community feed could not be loaded.</p>
                <button type="button" onClick={() => void reload()} className="mt-3 rounded-full bg-[#2563eb] px-4 py-2 text-[11px] font-bold text-white">Try again</button>
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-[24px] border border-[#dce5ef] bg-white px-6 py-12 text-center shadow-[0_10px_30px_rgba(15,35,63,0.045)]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                  <Users size={19} />
                </div>
                <p className="mt-4 text-[13px] font-semibold text-[#475569]">Nothing here yet.</p>
                <p className="mx-auto mt-1 max-w-[320px] text-[11px] leading-5 text-[#94a3b8]">
                  Share a training update, a question, or why you signed up. The community starts with you.
                </p>
              </div>
            ) : (
              posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={currentUserId}
                  onReact={toggleReaction}
                  onUpdate={updatePost}
                  onDelete={deletePost}
                />
              ))
            )}
          </div>

          {/* Side card — desktop only (the dashboard already carries the countdown on mobile) */}
          <aside className="hidden rounded-[24px] border border-[#cfe0f7] bg-[#102f59] p-6 text-white shadow-[0_12px_35px_rgba(15,35,63,0.1)] lg:sticky lg:top-6 lg:block">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[rgba(255,255,255,.1)] text-[#7db3ff]">
              <CalendarDays size={19} />
            </div>
            <p className="mt-6 font-num text-[10px] font-extrabold uppercase tracking-[0.13em] text-white/45">
              Race day · 1 November 2026
            </p>
            <p className="mt-2 font-num text-[46px] font-extrabold leading-none tracking-[-0.035em]">
              {daysUntil}
            </p>
            <p className="mt-1 text-[12px] font-medium text-white/60">
              day{daysUntil === 1 ? '' : 's'} to go
            </p>
            <h2 className="mt-6 font-serif text-[22px] font-bold leading-tight">
              Stronger together.
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-white/60">
              Cheer someone on, ask what you&apos;ve been wondering, or share how training is going. Every post makes the start line a little less lonely.
            </p>
          </aside>
        </section>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <div className="flex min-h-[30vh] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
    </div>
  )
}
