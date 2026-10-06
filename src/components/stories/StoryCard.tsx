import { CATEGORY_MAP, DISCIPLINE_MAP } from '@/config/categories'
import { initials, truncate } from '@/lib/utils'
import type { PublicStory } from '@/lib/supabase/stories'
import styles from '@/components/public/public.module.css'

const TRUNCATE_AT = 220

export function StoryCard({ story }: { story: PublicStory }) {
  const category = CATEGORY_MAP[story.category]
  const discipline = story.discipline ? DISCIPLINE_MAP[story.discipline] : null
  const badgeLabel = discipline ? `${category?.name ?? story.category} · ${discipline.name}` : category?.name ?? story.category
  const isLong = story.story.length > TRUNCATE_AT

  return <article className={styles.storyCard}>
    <div className={styles.storyIdentity}>
      <span className={styles.avatar} aria-hidden="true">{initials(story.full_name)}</span>
      <div><h3 className={styles.storyName}>{story.full_name}</h3><span className={styles.storyBadge} style={discipline ? { backgroundColor: discipline.hex } : undefined}>{badgeLabel}</span></div>
    </div>
    {isLong && <details><summary>Read the full story<span className="sr-only"> from {story.full_name}</span></summary><blockquote>&ldquo;{story.story}&rdquo;</blockquote></details>}
    <blockquote>&ldquo;{isLong ? truncate(story.story, TRUNCATE_AT) : story.story}&rdquo;</blockquote>
  </article>
}
