'use client'
import * as React from 'react'
import Link from 'next/link'
import { IconNextChat } from '@/components/ui/icons'
import { ProfileDropDown } from '@/components/ui/profile-dropdown'
import useGetUser from '@/lib/hooks/useGetUser'
import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between w-full">
        <>
          <Link href="/" rel="nofollow">
            <IconNextChat className="size-6 mr-2 dark:hidden" inverted />
          </Link>
          <div className="flex items-center">
            <UserOrLogin />
          </div>
        </>
      </div>
    </header>
  )
}

function UserOrLogin() {
  const { isLoggedIn } = useGetUser()
  const supabase = createClient()

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error(error)
      return
    }
    console.log(data)
  }

  useEffect(() => {
    getSession()
  }, [])

  return (
    <>{isLoggedIn ? <ProfileDropDown /> : <Link href="/login">Sign in</Link>}</>
  )
}
1
