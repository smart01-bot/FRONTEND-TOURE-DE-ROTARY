import { redirect }                 from 'next/navigation'
import { getSupabaseServer }        from '@/lib/supabase/server'
import { AdminShell }               from '@/components/admin/AdminNav'
import { ParticipantThemeProvider } from '@/context/ParticipantThemeContext'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/admin/overview')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if ((profile as { role?: string } | null)?.role !== 'hq_admin') redirect('/dashboard')

  return (
    <ParticipantThemeProvider>
      <AdminShell name={profile?.full_name ?? 'HQ Admin'}>{children}</AdminShell>
    </ParticipantThemeProvider>
  )
}
