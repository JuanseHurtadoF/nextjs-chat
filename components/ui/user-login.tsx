'use client'
import useGetUser from '@/lib/hooks/use-get-user'
import { ProfileDropDown } from './profile-dropdown'
import Link from 'next/link'
import { Button } from './button'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function UserOrLogin(): React.JSX.Element {
  const { isLoggedIn } = useGetUser()
  const [user, setUser] = useState<any>(null)

  const getUser = async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      {isLoggedIn ? (
        <ProfileDropDown user={user} />
      ) : (
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      )}
    </>
  )
}
