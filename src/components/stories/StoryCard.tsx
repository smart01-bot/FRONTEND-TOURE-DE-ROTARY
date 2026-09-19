import { CATEGORY_MAP, DISCIPLINE_MAP } from '@/config/categories'
import { initials, truncate } from '@/lib/utils'
import type { PublicStory } from '@/lib/supabase/stories'

const TRUNCATE_AT = 220

export function StoryCard({ story }: { story: PublicStory }) {
  const category   = CATEGORY_MAP[story.category]
  const discipline  = story.discipline ? DISCIPLINE_MAP[story.discipline] : null
  const badgeLabel  = discipline ? `${category?.name ?? story.category} · ${discipline.name}` : category?.name ?? story.category
  const badgeColor  = discipline?.hex ?? '#C8953C'
  const isLong      = story.story.length > TRUNCATE_AT

  return (
    <article className="bg-parchment border border-parchment-dark rounded-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-[12px] font-bold text-bronze leading-none">
              {initials(story.full_name)}
            </span>
          </div>
          <span className="font-sans text-[13px] font-bold text-navy">{story.full_name}</span>
        </div>
        <span
          className="font-sans text-[10px] font-bold px-2 py-1 rounded-pill flex-shrink-0"
          style={{ background: badgeColor, color: '#0D1B3D' }}
        >
          {badgeLabel}
        </span>
      </div>

      <p className="font-serif text-[14px] italic text-ink leading-[1.65]">
        &ldquo;{isLong ? truncate(story.story, TRUNCATE_AT) : story.story}&rdquo;
      </p>
    </article>
  )
}
