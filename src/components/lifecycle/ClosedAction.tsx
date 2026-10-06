export function ClosedAction({ title, explanation }: { title: string; explanation: string }) {
  return (
    <section className="rounded-[16px] border border-[#F8BE22]/40 bg-[#FFF8DE] px-5 py-5 text-center text-navy" role="status">
      <h2 className="font-serif text-[21px] font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-[380px] font-sans text-[11px] leading-relaxed text-navy/60">{explanation}</p>
    </section>
  )
}
