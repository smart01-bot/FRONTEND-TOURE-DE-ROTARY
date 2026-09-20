'use client'

import Link from 'next/link'
import { useFeed } from '@/hooks/useFeed'
import { initials, relativeTime, truncate } from '@/lib/utils'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'

export default function CommunityPulse() {
  const { posts, loading, error, reload } = useFeed()
  const recent = posts.slice(0, 2)
  return (
    <section className="bg-sand px-5 pt-11 pb-9">

      {/* Header row */}
      <div className="flex items-end justify-between mb-5">
        <h2 className="font-serif text-section font-bold text-navy leading-[1.18] tracking-tight">
          The community<br />is already moving.
        </h2>
        <Link href="/feed" className="font-sans text-[12px] font-semibold text-bronze whitespace-nowrap ml-3 flex-shrink-0">
          {ACTIVE_LIFECYCLE.community.state === 'read_only' ? 'View memories' : 'View all'}
        </Link>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-2.5 mb-4">
        {loading ? (
          <div className="h-28 animate-pulse rounded-card bg-white/70" aria-label="Loading community posts" />
        ) : error ? (
          <div className="rounded-card bg-white p-5 text-center shadow-card">
            <p className="font-sans text-[12px] text-ink-muted">Community updates could not be loaded.</p>
            <button type="button" onClick={() => void reload()} className="mt-3 font-sans text-[11px] font-bold text-bronze">Try again</button>
          </div>
        ) : recent.length === 0 ? (
          <div className="rounded-card bg-white p-5 text-center shadow-card">
            <p className="font-serif text-[17px] font-bold text-navy">The first update is waiting to be shared.</p>
            <p className="mt-2 font-sans text-[12px] leading-relaxed text-ink-subtle">Registered participants can start the conversation from their portal.</p>
          </div>
        ) : recent.map(post => (
            <article key={post.id} className="bg-white rounded-card shadow-card p-4">
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-[12px] font-bold text-bronze">
                    {initials(post.full_name)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <span className="font-sans text-[13px] font-bold text-navy">
                      {post.full_name}
                    </span>
                    {post.discipline && <span className="rounded-pill bg-parchment px-1.5 py-0.5 font-sans text-[10px] font-bold capitalize text-navy">{post.discipline}</span>}
                    <span className="font-sans text-[11px] text-ink-subtle ml-auto">
                      {relativeTime(post.created_at)}
                    </span>
                  </div>

                  {/* Content */}
                  <p className="font-sans text-[13px] text-ink-muted leading-[1.5]">
                    {truncate(post.content, 150)}
                  </p>

                  {/* Reactions — Jakarta Sans for the count */}
                  <div className="flex items-center gap-3.5 mt-2.5">
                    <span className="font-sans text-[12px] text-ink-subtle">
                      👏&nbsp;<span className="font-num font-bold">{post.reactions.length}</span>
                    </span>
                    <span className="font-sans text-[12px] text-ink-subtle">
                      {post.comment_count} {post.comment_count === 1 ? 'reply' : 'replies'}
                    </span>
                  </div>
                </div>
              </div>
            </article>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/feed"
        className="w-full py-3.5 bg-transparent border border-sand-dark rounded-button
                   font-sans text-body-sm font-semibold text-ink-subtle
                   hover:border-ink-ghost transition-colors duration-200
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2"
      >
        {ACTIVE_LIFECYCLE.community.state === 'read_only' ? 'Read community stories' : 'Join the conversation'}
      </Link>

    </section>
  )
}
