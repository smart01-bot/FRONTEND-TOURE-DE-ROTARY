import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import type { ButtonHTMLAttributes, ComponentProps, HTMLAttributes, ReactNode } from 'react'
import type { DisciplineSlug } from '@/types'
import styles from './visual-system.module.css'

type Mode = 'public' | 'participant' | 'admin'
type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type Variant = 'primary' | 'secondary' | 'quiet'
const classes = (...values: (string | undefined)[]) => values.filter(Boolean).join(' ')

/** Opt in per surface; never changes auth, lifecycle or participant theme state. */
export function VisualSurface({ mode, tone = 'light', className, ...props }: HTMLAttributes<HTMLDivElement> & {
  mode: Mode; tone?: 'light' | 'dark'
}) {
  return <div {...props} data-presentation={mode} data-tone={tone} className={classes(styles.surface, className)} />
}

export function SectionHeading({ eyebrow, title, children, level = 2, id }: {
  eyebrow?: string; title: string; children?: ReactNode; level?: 1 | 2 | 3; id?: string
}) {
  const Heading = `h${level}` as 'h1' | 'h2' | 'h3'
  return <header className={styles.heading}>
    {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
    <Heading id={id} className={styles.display}>{title}</Heading>
    {children && <div className={styles.description}>{children}</div>}
  </header>
}

export function VisualButton({ variant = 'primary', type = 'button', className, ...props }:
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button {...props} type={type} data-variant={variant} className={classes(styles.button, className)} />
}

/** For available navigation only. Use a disabled button and explanation for unavailable actions. */
export function VisualLink({ variant = 'primary', className, ...props }:
  ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} data-variant={variant} className={classes(styles.button, className)} />
}

export function VisualCard({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <article {...props} className={classes(styles.card, className)} />
}

export function VisualGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={classes(styles.grid, className)} />
}

/** Tone is visual emphasis, never a permission or publication decision. Always supply text. */
export function StatusIndicator({ tone = 'neutral', children, announce = false }: {
  tone?: Tone; children: ReactNode; announce?: boolean
}) {
  return <span className={styles.status} data-status={tone} role={announce ? 'status' : undefined}>
    <span aria-hidden="true" className={styles.statusDot} />{children}
  </span>
}

export function DisciplineLabel({ discipline }: { discipline: DisciplineSlug }) {
  return <span className={styles.discipline} data-discipline={discipline}>{discipline.toUpperCase()}</span>
}

/** Requires caller-reviewed imagery. Caption is on a solid surface, not over the photograph. */
export function ImagePanel({ src, alt, caption, sizes = '(min-width: 1024px) 50vw, 100vw', priority = false }: {
  src: ImageProps['src']; alt: string; caption: ReactNode; sizes?: string; priority?: boolean
}) {
  return <figure className={styles.imagePanel}>
    <div className={styles.imageFrame}><Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.image} /></div>
    <figcaption className={styles.caption}>{caption}</figcaption>
  </figure>
}

export function EventTile({ discipline, title, children, action }: {
  discipline: DisciplineSlug; title: string; children: ReactNode; action?: ReactNode
}) {
  return <article className={classes(styles.card, styles.eventTile)} data-discipline={discipline}>
    <DisciplineLabel discipline={discipline} />
    <h3 className={styles.cardTitle}>{title}</h3>
    <div className={styles.description}>{children}</div>
    {action && <div className={styles.actions}>{action}</div>}
  </article>
}

/** The caller owns approved geometry, text alternatives and availability. No map dependency. */
export function RoutePanel({ title, status, children }: { title: string; status: ReactNode; children: ReactNode }) {
  return <VisualCard>
    <div className={styles.row}><h3 className={styles.cardTitle}>{title}</h3>{status}</div>
    <div className={styles.routeContent}>{children}</div>
  </VisualCard>
}

/** A display surface only; no inferred sponsor relationship, tier, identity or consent. */
export function SponsorSurface({ name, tier, logo, children }: {
  name: string; tier: string; logo?: ReactNode; children?: ReactNode
}) {
  return <VisualCard>
    <p className={styles.eyebrow}>{tier}</p>
    {logo && <div className={styles.sponsorLogo}>{logo}</div>}
    <h3 className={styles.cardTitle}>{name}</h3>
    {children}
  </VisualCard>
}

/** Pass only identity fields authorised for this audience. No implicit photo/bib disclosure. */
export function ParticipantCard({ name, status, children }: { name: string; status?: ReactNode; children?: ReactNode }) {
  return <VisualCard>
    <div className={styles.row}><h3 className={styles.cardTitle}>{name}</h3>{status}</div>
    {children && <div className={styles.description}>{children}</div>}
  </VisualCard>
}
