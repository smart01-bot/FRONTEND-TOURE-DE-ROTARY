'use client'

import PublicPage from '@/components/public/PublicPage'
import styles from '@/components/public/public.module.css'
import { VisualButton, VisualLink } from '@/components/visual-system'
import { StoryCard } from '@/components/stories/StoryCard'
import { useStories } from '@/hooks/useStories'
import { CATEGORIES } from '@/config/categories'
import type { Category } from '@/types'

const FILTERS: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All stories' },
  ...CATEGORIES.map(c => ({ value: c.slug, label: c.name })),
]

export default function StoriesPage() {
  const { stories, allCount, loading, error, reload, filter, setFilter } = useStories()
  return <PublicPage current="/stories" eyebrow="People / Purpose / Dar" title="Why we race." accent="magenta" description="Behind every start is a reason. In their own words, participants share why they are doing this." action={<VisualLink href="/profile">Your story &amp; sharing choice ↗</VisualLink>}>
    <section className={styles.content} aria-labelledby="story-collection">
      <h2 id="story-collection" className="font-bold text-xl">Participant stories</h2>
      <p className={styles.muted} role="status">{loading ? 'Loading stories…' : error ? 'Stories are unavailable right now.' : `${allCount} ${allCount === 1 ? 'participant has' : 'participants have'} shared a public story.`}</p>
      <div className={styles.filters} role="group" aria-label="Filter stories by category">
        {FILTERS.map(f => <button key={f.value} type="button" onClick={() => setFilter(f.value)} aria-pressed={filter === f.value}>{f.label}</button>)}
      </div>
      {loading ? <div className={styles.state} role="status"><p>Loading participant stories…</p></div>
        : error ? <div className={styles.state} role="alert"><h2>Stories could not be loaded.</h2><p>Please try again to read the community’s stories.</p><div className={styles.actions}><VisualButton onClick={() => void reload()}>Try again</VisualButton></div></div>
        : stories.length === 0 ? <div className={styles.state}><h2>{allCount === 0 ? 'The first story starts with you.' : 'No stories in this category yet.'}</h2><p>Add your story from your participant profile and choose whether to share it publicly.</p><div className={styles.actions}>{filter !== 'all' && <VisualButton onClick={() => setFilter('all')}>View all stories</VisualButton>}<VisualLink href="/profile" variant="secondary">Open your profile</VisualLink></div></div>
        : <div className={styles.storyGrid}>{stories.map(story => <StoryCard key={story.id} story={story} />)}</div>}
    </section>
  </PublicPage>
}
