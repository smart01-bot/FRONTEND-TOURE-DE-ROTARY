'use client'

import { useFeed } from '@/hooks/useFeed'
import { initials, relativeTime, truncate } from '@/lib/utils'
import { ACTIVE_LIFECYCLE } from '@/config/lifecycle'
import { SectionHeading, VisualButton, VisualLink } from '@/components/visual-system'
import styles from './landing.module.css'

export default function CommunityPulse() {
  const { posts, loading, error, reload } = useFeed()
  const recent = posts.slice(0, 2)
  return <section className={styles.section} aria-labelledby="community-title">
    <div className={styles.sectionTop}>
      <SectionHeading id="community-title" eyebrow="03 / More than a start line" title="A shared journey.">
        <p>Preparation, encouragement and the moments in between. Updates from the participant community.</p>
      </SectionHeading>
      <VisualLink href="/feed" variant="quiet">{ACTIVE_LIFECYCLE.community.state === 'read_only' ? 'View memories' : 'View all updates'}</VisualLink>
    </div>
    <div aria-busy={loading}>
      {loading ? <p className={styles.loading} role="status">Loading community posts…</p> : error ? <div className={styles.post}>
        <p role="status">Community updates could not be loaded.</p>
        <div className={styles.actions}><VisualButton variant="secondary" onClick={() => void reload()}>Try again</VisualButton></div>
      </div> : recent.length === 0 ? <div className={styles.post} role="status">
        <h3 className={styles.editorialTitle}>No community updates to show yet.</h3>
        <p>{ACTIVE_LIFECYCLE.community.state === 'read_only' ? ACTIVE_LIFECYCLE.community.explanation : 'Registered participants can start the conversation from their portal.'}</p>
      </div> : <div className={styles.postGrid}>{recent.map(post => <article key={post.id} className={styles.post}>
        <div className={styles.identity}>
          <span className={styles.avatar} aria-hidden>{initials(post.full_name)}</span>
          <div><h3><strong>{post.full_name}</strong></h3><p className={styles.small}>{post.discipline && <span className="capitalize">{post.discipline} · </span>}<time dateTime={post.created_at}>{relativeTime(post.created_at)}</time></p></div>
        </div>
        <p className={styles.postContent}>{truncate(post.content, 220)}</p>
        <div className={styles.counts}><span>{post.reactions.length} reactions</span><span>{post.comment_count} {post.comment_count === 1 ? 'reply' : 'replies'}</span></div>
      </article>)}</div>}
    </div>
    <div className={styles.actions}><VisualLink href="/feed">{ACTIVE_LIFECYCLE.community.state === 'read_only' ? 'Read community stories' : 'Join the conversation'} <span aria-hidden>↗</span></VisualLink></div>
    <p className={styles.small}>The participant portal requires sign-in. {ACTIVE_LIFECYCLE.community.explanation}</p>
  </section>
}
