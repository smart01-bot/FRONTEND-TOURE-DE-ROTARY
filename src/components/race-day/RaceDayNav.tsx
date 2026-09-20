import Link from 'next/link'
import { Camera, Images, ListOrdered, Trophy } from 'lucide-react'

const items = [
  { href: '/results', label: 'My result', icon: Trophy },
  { href: '/results/leaderboards', label: 'Leaderboards', icon: ListOrdered },
  { href: '/results/photos', label: 'Photos / Find Me', icon: Camera },
  { href: '/results/memories', label: 'Memories', icon: Images },
]

export function RaceDayNav() {
  return (
    <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Race day and memories">
      {items.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#dbe4ef] bg-white px-4 text-[10px] font-extrabold text-[#2563eb] shadow-sm">
          <Icon size={14} /> {label}
        </Link>
      ))}
    </nav>
  )
}
