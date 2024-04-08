import { Chat } from '@/lib/types'
import { SidebarActions } from '@/components/sidebar/sidebar-actions'
import { SidebarItem } from '@/components/sidebar/sidebar-item'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { removeChat } from '@/lib/chat/actions'

interface SidebarItemsProps {
  chats?: Chat[]
}

export async function shareChat(chat: Chat) {
  'use server'
  const supabase = createClient()
  const newChat = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  // update chat where id is chat.id
  const { error } = await supabase
    .from('chats')
    .update(newChat)
    .eq('id', chat.id)
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  if (!chats?.length) return null

  return (
    <div>
      {chats?.map(
        (chat, index) =>
          chat && (
            <div key={chat?.id}>
              <SidebarItem index={index} chat={chat}>
                <SidebarActions
                  chat={chat}
                  removeChat={removeChat}
                  shareChat={shareChat}
                />
              </SidebarItem>
            </div>
          )
      )}
    </div>
  )
}
