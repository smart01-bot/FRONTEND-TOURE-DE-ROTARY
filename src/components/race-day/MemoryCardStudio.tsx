'use client'

import { useState } from 'react'
import { Download, Share2 } from 'lucide-react'
import { CATEGORY_MAP } from '@/config/categories'
import type { Registration, UserProfile } from '@/types'

type CardKind = 'digital_bib' | 'story'

export function MemoryCardStudio({ profile, registration }: { profile: UserProfile | null; registration: Registration | null }) {
  const [notice, setNotice] = useState('')
  const name = profile?.full_name?.trim() || 'Tour de Dar participant'
  const bib = registration?.bib_number
  const story = registration?.story?.trim()
  const category = registration?.category ? CATEGORY_MAP[registration.category].name : 'Participant'

  async function createCard(kind: CardKind) {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 1500
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Card rendering is unavailable in this browser.')
    ctx.fillStyle = '#102f59'; ctx.fillRect(0, 0, 1200, 1500)
    ctx.fillStyle = '#B12A70'; ctx.fillRect(0, 0, 1200, 28)
    ctx.fillStyle = '#F8BE22'; ctx.fillRect(0, 28, 1200, 18)
    ctx.fillStyle = '#ffffff'; ctx.font = '800 42px Arial'; ctx.fillText('TOUR DE DAR', 80, 130)
    ctx.fillStyle = '#7db3ff'; ctx.font = '700 22px Arial'; ctx.fillText('1 NOVEMBER 2026 · DAR ES SALAAM', 80, 178)
    ctx.fillStyle = '#ffffff'; ctx.font = '700 74px Georgia'; wrap(ctx, name, 80, 340, 1040, 88)
    ctx.fillStyle = '#9fb3cb'; ctx.font = '700 25px Arial'; ctx.fillText(category.toUpperCase(), 80, 570)
    if (kind === 'digital_bib') {
      ctx.fillStyle = '#F8BE22'; ctx.font = '900 260px Arial'; ctx.fillText(`#${bib}`, 70, 970)
      ctx.fillStyle = '#ffffff'; ctx.font = '700 30px Arial'; ctx.fillText('MY DIGITAL BIB', 80, 1060)
    } else {
      ctx.fillStyle = '#ffffff'; ctx.font = 'italic 48px Georgia'; wrap(ctx, `“${story}”`, 80, 720, 1040, 68)
      ctx.fillStyle = '#F8BE22'; ctx.font = '700 28px Arial'; ctx.fillText('WHY I AM DOING THIS', 80, 1180)
    }
    ctx.fillStyle = '#B12A70'; ctx.fillRect(80, 1340, 320, 12)
    ctx.fillStyle = '#F8BE22'; ctx.fillRect(410, 1340, 180, 12)
    ctx.fillStyle = '#ffffff'; ctx.font = '600 22px Arial'; ctx.fillText('Stronger together.', 80, 1410)
    return canvas
  }

  async function save(kind: CardKind) {
    try {
      const canvas = await createCard(kind)
      const link = document.createElement('a')
      link.download = `tour-de-dar-${kind === 'digital_bib' ? 'bib' : 'story'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      setNotice('Card saved as an image.')
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Card could not be saved.') }
  }

  async function share(kind: CardKind) {
    try {
      const canvas = await createCard(kind)
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'))
      if (!blob) throw new Error('Card could not be prepared.')
      const file = new File([blob], `tour-de-dar-${kind}.png`, { type: 'image/png' })
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: 'My Tour de Dar memory', text: 'My Tour de Dar memory', files: [file] })
        setNotice('Share sheet opened.')
      } else {
        await save(kind)
        setNotice('Sharing files is unavailable here, so the card was downloaded instead.')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setNotice(error instanceof Error ? error.message : 'Card could not be shared.')
    }
  }

  return <>
    <div className="grid gap-4 md:grid-cols-2">
      <MemoryPreview title="Digital-bib card" enabled={Boolean(bib)} reason="A real assigned bib is required." accent="bg-[#F8BE22]" onSave={() => void save('digital_bib')} onShare={() => void share('digital_bib')}>
        <p className="font-num text-[11px] font-extrabold uppercase tracking-[.12em] text-white/45">{category}</p><p className="mt-6 font-serif text-[24px] font-bold text-white">{name}</p><p className="mt-5 font-num text-[64px] font-extrabold leading-none text-[#F8BE22]">{bib ? `#${bib}` : '—'}</p>
      </MemoryPreview>
      <MemoryPreview title="Participant-story card" enabled={Boolean(story)} reason="Save your real participant story first." accent="bg-[#B12A70]" onSave={() => void save('story')} onShare={() => void share('story')}>
        <p className="font-num text-[11px] font-extrabold uppercase tracking-[.12em] text-white/45">Why I am doing this</p><p className="mt-6 line-clamp-4 font-serif text-[22px] font-bold italic leading-8 text-white">{story ? `“${story}”` : 'No story saved yet.'}</p><p className="mt-5 text-[11px] font-bold text-[#F8BE22]">{name}</p>
      </MemoryPreview>
    </div>
    {notice && <p role="status" className="mt-3 text-[10px] font-semibold text-[#2563eb]">{notice}</p>}
  </>
}

function MemoryPreview({ title, enabled, reason, accent, onSave, onShare, children }: { title: string; enabled: boolean; reason: string; accent: string; onSave: () => void; onShare: () => void; children: React.ReactNode }) {
  const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] border border-[#dce5ef] px-4 text-[10px] font-extrabold text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-35'
  return <article className="overflow-hidden rounded-[22px] border border-[#dce5ef] bg-white shadow-[0_8px_24px_rgba(15,35,63,.05)]"><div className={`h-2 ${accent}`} /><div className="m-4 min-h-[300px] rounded-[18px] bg-[#102f59] p-6">{children}<div className="mt-8 flex items-center gap-2"><span className="h-1 w-16 bg-[#B12A70]" /><span className="h-1 w-10 bg-[#F8BE22]" /></div></div><div className="p-4 pt-0"><h2 className="text-[12px] font-extrabold">{title}</h2>{!enabled && <p className="mt-1 text-[9px] text-[#64748b]">{reason}</p>}<div className="mt-3 grid grid-cols-2 gap-2"><button type="button" disabled={!enabled} onClick={onSave} className={button}><Download size={14} /> Save</button><button type="button" disabled={!enabled} onClick={onShare} className={button}><Share2 size={14} /> Share</button></div></div></article>
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(/\s+/); let line = ''; let row = 0
  words.forEach(word => { const test = line ? `${line} ${word}` : word; if (ctx.measureText(test).width > maxWidth && line) { ctx.fillText(line, x, y + row * lineHeight); line = word; row += 1 } else line = test })
  if (line) ctx.fillText(line, x, y + row * lineHeight)
}
