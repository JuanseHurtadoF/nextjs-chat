import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { Chat } from '@/components/chat/chat'
import { AI } from '@/lib/chat/actions'
import { createClient } from '@/lib/supabase/server'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return {}
  }

  // get chat from supabase
  const { data, error } = await supabase
    .from('chat')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    return {}
  }

  return {
    title: data.title
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  console.log(user)

  if (!user) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const { data: chat, error } = await supabase
    .from('chats')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!chat || error) {
    return notFound()
  }

  if (!chat) {
    redirect('/')
  }

  if (chat?.user_id !== user.id) {
    notFound()
  }

  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <Chat id={chat.id} user={user} initialMessages={chat.messages} />
    </AI>
  )
}
