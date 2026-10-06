'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { MessageCircle, MessagesSquare, RefreshCw, Sparkles } from 'lucide-react'
import { getParticipantPosts } from '@/lib/supabase/feed'
import { relativeTime } from '@/lib/utils'
import type { FeedPost } from '@/types/feed'

export function ParticipantActivity({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<FeedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setPosts(await getParticipantPosts(userId))
    } catch {
      setError('Your community activity could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => { void load() }, [load])

  return (
    <section className="mt-5 overflow-hidden rounded-[24px] border border-[#e1e7f0] bg-white shadow-[0_12px_40px_rgba(16,29,53,.05)]" aria-labelledby="activity-title">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0f5] px-5 py-5 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#edf3fb] text-[#2456a6]">
            <Sparkles size={16} />
          </span>
          <div>
            <h2 id="activity-title" className="font-sans text-[13px] font-extrabold text-[#101d35]">Your community activity</h2>
            <p className="mt-0.5 font-sans text-[10px] text-[#8a96a7]">Visible only inside your authenticated profile.</p>
          </div>
        </div>
        <Link href="/feed" className="inline-flex min-h-11 items-center rounded-full border border-[#dfe6f0] px-4 font-sans text-[10px] font-extrabold text-[#2456a6]">
          Open The Run-Up
        </Link>
      </div>

      <div className="p-5 sm:p-7">
        {loading ? (
          <div role="status" className="flex min-h-28 items-center justify-center" aria-label="Loading your community activity">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#2456a6] border-t-transparent" />
          </div>
        ) : error ? (
          <div role="alert" className="rounded-[16px] border border-[#ead8d5] bg-[#fff7f6] p-5 text-center">
            <p className="font-sans text-[11px] font-semibold text-[#c45c51]">{error}</p>
            <button type="button" onClick={() => void load()} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#ead8d5] px-4 font-sans text-[10px] font-extrabold text-[#c45c51]">
              <RefreshCw size={13} /> Try again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-[#dfe6f0] px-5 py-8 text-center">
            <MessagesSquare size={20} className="mx-auto text-[#9aa6b6]" />
            <p className="mt-3 font-sans text-[12px] font-bold text-[#26354d]">No community posts yet.</p>
            <p className="mx-auto mt-1 max-w-[360px] font-sans text-[10px] leading-5 text-[#8a96a7]">Your real posts will appear here after you share something in The Run-Up.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#eef1f5]">
            {posts.slice(0, 5).map(post => (
              <article key={post.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-num text-[9px] font-extrabold uppercase tracking-[.1em] text-[#2456a6]">{post.post_type.replace('_', ' ')}</span>
                  <span className="font-sans text-[9px] text-[#9aa6b6]">{relativeTime(post.created_at)}</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap break-words font-sans text-[12px] leading-5 text-[#4e5d71]">{post.content}</p>
                <div className="mt-2 flex items-center gap-4 font-sans text-[9px] font-semibold text-[#8a96a7]">
                  <span>{post.reactions.length} {post.reactions.length === 1 ? 'reaction' : 'reactions'}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={11} /> {post.comment_count}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
