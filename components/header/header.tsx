import * as React from 'react'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/sidebar/sidebar'
import { SidebarList } from '@/components/sidebar/sidebar-list'
import { UserOrLogin } from '@/components/ui/user-login'

export async function Header() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between w-full">
        <Sidebar>
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            <SidebarList userId={user?.id} />
          </React.Suspense>
        </Sidebar>
        <UserOrLogin />
      </div>
    </header>
  )
}
