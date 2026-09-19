import { CATEGORIES, DISCIPLINES } from '@/config/categories'

const STATS = [
  { value: String(CATEGORIES.length), label: 'Race options' },
  { value: String(DISCIPLINES.length), label: 'Disciplines' },
  { value: '1', label: 'City' },
]

export default function StatsStrip() {
  return (
    <section className="bg-navy-700 px-5 py-5 flex justify-around">
      {STATS.map(({ value, label }) => (
        <div key={label} className="text-center">
          {/* Number — Plus Jakarta Sans */}
          <div className="font-num text-[30px] font-black text-bronze leading-none tracking-tight mb-1">
            {value}
          </div>
          {/* Label — Montserrat */}
          <div className="font-sans text-[10px] font-bold text-white/35 uppercase tracking-[.07em]">
            {label}
          </div>
        </div>
      ))}
    </section>
  )
}
