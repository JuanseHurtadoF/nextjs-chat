import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { Chat } from '@/components/chat/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { nanoid } from 'nanoid'

export interface ChatPageProps {
  params: {
    id: string
  }
}

// export async function generateMetadata({
//   params
// }: ChatPageProps): Promise<Metadata> {
//   const session = await auth()

//   if (!session?.user) {
//     return {}
//   }

//   const chat = await getChat(params.id, session.user.id)
//   return {
//     title: chat?.title.toString().slice(0, 50) ?? 'Chat'
//   }
// }

export default async function ChatPage({ params }: ChatPageProps) {
  // const session = (await auth()) as Session
  // const missingKeys = await getMissingKeys()

  redirect(`/login?next=/chat/${params.id}`)

  // const userId = session.user.id as string
  // const chat = await getChat(params.id, userId)
  const chatId = nanoid()

  // if (!chat) {
  //   redirect('/')
  // }

  // if (chat?.userId !== session?.user?.id) {
  //   notFound()
  // }

  return (
    <AI initialAIState={{ chatId: chatId, messages: [] }}>
      <Chat
      // id={chat.id}
      // session={session}
      // initialMessages={chat.messages}
      // missingKeys={missingKeys}
      />
    </AI>
  )
}
