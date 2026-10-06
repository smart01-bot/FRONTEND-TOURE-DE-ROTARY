import { CameraOff, ImageOff, Search, ShieldCheck } from 'lucide-react'
import { RaceDayHeader } from '@/components/race-day/RaceDayHeader'
import { CapabilityCards } from '@/components/race-day/CapabilityCards'
import { PHOTO_CAPABILITIES } from '@/config/race-day'

export default function PhotosPage() {
  return <div className="participant-race-day min-h-full bg-[#f6f8fb] text-[#10233f]"><div className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-7 sm:px-7 lg:px-10 lg:pb-14 lg:pt-9">
    <RaceDayHeader eyebrow="Race memories" title="Photos & Find Me." description="Browse event albums and find photographs linked to your bib when approved photography and consent systems are connected." />
    <section className="mt-7 rounded-[24px] border border-[#cfe0f7] bg-[#102f59] p-5 text-white sm:p-6"><div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#7db3ff]"><CameraOff size={19} /></span><div><h2 className="font-serif text-[20px] font-bold">Event photography is not connected.</h2><p className="mt-2 max-w-[720px] text-[11px] leading-5 text-white/60">No approved gallery, album records, storage bucket, photographer credits, bib associations or consent policies exist. No placeholder photos are presented as event media.</p></div></div></section>
    <section className="mt-5 rounded-[18px] border border-[#dce5ef] bg-white p-5"><label htmlFor="bib-photo-search" className="text-[11px] font-extrabold">Find Me by bib number</label><div className="relative mt-2"><Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" /><input id="bib-photo-search" disabled placeholder="Bib search becomes available after photo associations are approved" className="min-h-12 w-full cursor-not-allowed rounded-[13px] border border-[#dce5ef] bg-[#f8fafc] pl-11 pr-4 text-[11px] opacity-65" /></div></section>
    <section className="mt-5 flex min-h-[240px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#cbd8e6] bg-white px-6 text-center"><ImageOff size={26} className="text-[#94a3b8]" /><h2 className="mt-4 font-serif text-[19px] font-bold">No albums published</h2><p className="mt-2 max-w-[460px] text-[10px] leading-5 text-[#64748b]">Album categories, detail views, downloads, sharing and credits will activate only for real approved photographs.</p></section>
    <aside className="mt-5 flex items-start gap-3 rounded-[18px] border border-[#dce5ef] bg-white p-5"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#2563eb]" /><div><h2 className="text-[12px] font-extrabold">Privacy comes before discovery.</h2><p className="mt-1 text-[10px] leading-5 text-[#64748b]">Restricted or withdrawn photographs must never appear in search, albums, downloads or shared links.</p></div></aside>
    <section className="mt-7"><CapabilityCards items={PHOTO_CAPABILITIES} /></section>
  </div></div>
}
