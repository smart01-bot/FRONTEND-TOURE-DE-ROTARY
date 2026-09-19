'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Tour de Dar — Why We Race (public story collection)
// ─────────────────────────────────────────────────────────────────────────────

import HomeNav    from '@/components/home/HomeNav'
import HomeFooter from '@/components/home/HomeFooter'
import { StoryCard } from '@/components/stories/StoryCard'
import { useStories } from '@/hooks/useStories'
import { CATEGORIES } from '@/config/categories'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'

const FILTERS: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  ...CATEGORIES.map(c => ({ value: c.slug, label: c.name })),
]

export default function StoriesPage() {
  const { stories, allCount, loading, filter, setFilter } = useStories()

  return (
    <main>
      <HomeNav />

      <section className="bg-navy px-5 pt-10 pb-8">
        <h1 className="font-serif text-headline text-white">
          Why We <em className="text-bronze not-italic">Race.</em>
        </h1>
        <p className="font-sans text-[12px] text-white/45 mt-3">
          {loading ? 'Loading stories…' : `${allCount} ${allCount === 1 ? 'athlete has' : 'athletes have'} shared why they signed up.`}
        </p>
      </section>

      <div className="flex gap-2 overflow-x-auto px-5 py-4 bg-sand border-b border-sand-dark">
        {FILTERS.map(f => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={cn(
              'flex-shrink-0 font-sans text-[11px] font-bold px-3.5 py-1.5 rounded-pill border-[1.5px] transition-colors duration-200',
              filter === f.value
                ? 'bg-navy border-navy text-white'
                : 'bg-white border-parchment-dark text-ink-muted hover:border-bronze',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <section className="bg-sand px-5 py-6">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 rounded-full border-2 border-bronze border-t-transparent animate-spin" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-serif text-[18px] italic text-navy mb-2">No stories yet.</p>
            <p className="font-sans text-[12px] text-ink-subtle">
              Be the first to share why you&apos;re racing — add your story from your profile.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </section>

      <HomeFooter />
    </main>
  )
}
