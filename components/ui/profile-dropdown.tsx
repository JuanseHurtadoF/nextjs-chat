import { AvatarDemo } from './avatar'
import { createClient } from '@/lib/supabase/client'

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
  window.location.reload()
}

export function ProfileDropDown({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarDemo user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5}>
        <DropdownMenuItem className="flex gap-2" disabled>
          {`${user?.email.slice(0, 20)}...`}
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={logOut} className="flex gap-2 items-center w-full">
            <IconExit className="size-4 mr-4" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
