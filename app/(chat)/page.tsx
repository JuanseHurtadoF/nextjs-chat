import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat/chat'
import { AI } from '@/lib/chat/actions'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  // const session = (await auth()) as Session

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} />
    </AI>
  )
}
