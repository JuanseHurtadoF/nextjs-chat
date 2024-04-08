import * as React from 'react'
import Link from 'next/link'
import { IconNextChat } from '@/components/ui/icons'
import { ProfileDropDown } from '@/components/ui/profile-dropdown'
import useGetUser from '@/lib/hooks/use-get-user'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/sidebar/sidebar'
import { SidebarList } from '@/components/sidebar/sidebar-list'
import { SidebarFooter } from '@/components/sidebar/sidebar-footer'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ClearHistory } from '@/components/sidebar/clear-history'

export async function Header() {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between w-full">
        <>
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              <SidebarList userId={user?.id} />
            </React.Suspense>
          </Sidebar>
          {/* <div className="flex items-center">
            <UserOrLogin />
          </div> */}
        </>
      </div>
    </header>
  )
}

// function UserOrLogin() {
//   const { isLoggedIn } = useGetUser()
//   const supabase = createClient()

//   const getSession = async () => {
//     const { data, error } = await supabase.auth.getSession()
//     if (error) {
//       console.error(error)
//       return
//     }
//   }

//   useEffect(() => {
//     getSession()
//   }, [])

//   return (
//     <>{isLoggedIn ? <ProfileDropDown /> : <Link href="/login">Sign in</Link>}</>
//   )
// }
