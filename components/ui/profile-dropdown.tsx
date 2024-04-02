import { AvatarDemo } from './avatar'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { IconExit, IconProfile, IconSettings } from './icons'

async function logOut() {
  const supabase = createClient()
  await supabase.auth.signOut()

  return redirect('/login')
}

export function ProfileDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarDemo />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5}>
        <DropdownMenuItem className="flex gap-2">
          <IconProfile className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2">
          <IconSettings className="size-4 mr-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form className="flex gap-2 items-center" action={logOut}>
            <IconExit className="size-4 mr-4" />
            <button type="submit">Logout</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
