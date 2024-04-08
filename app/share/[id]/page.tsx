import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { formatDate } from '@/lib/utils'
// import { getSharedChat } from '@/app/actions'
import { ChatList } from '@/components/chat/chat-list'
import { FooterText } from '@/components/footer/footer'
import { AI, UIState, getUIStateFromAIState } from '@/lib/chat/actions'
import { createClient } from '@/lib/supabase/server'
import { Chat } from '@/lib/types'

export const runtime = 'edge'
export const preferredRegion = 'home'

interface SharePageProps {
  params: {
    id: string
  }
}

async function getSharedChat(id: string) {
  'use server'
  const supabase = createClient()
  // get the messages from the chat with id
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const data = await getSharedChat(params.id)

  return {
    title: data?.title.slice(0, 50) ?? 'Chat'
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id)

  if (!chat || !chat.share_path) {
    notFound()
  }

  const uiState: UIState = getUIStateFromAIState(chat)

  return (
    <>
      <div className="flex-1 space-y-6">
        <div className="border-b bg-background px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto max-w-2xl">
            <div className="space-y-1 md:-mx-8">
              <h1 className="text-2xl font-bold">{chat.title}</h1>
              <div className="text-sm text-muted-foreground">
                {formatDate(chat.createdAt)} · {chat.messages.length} messages
              </div>
            </div>
          </div>
        </div>
        <AI>
          <ChatList messages={uiState} isShared={true} />
        </AI>
      </div>
      <FooterText className="py-8" />
    </>
  )
}
