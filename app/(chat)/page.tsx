import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat/chat'
import { AI } from '@/lib/chat/actions'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const supabase = createClient()
  const id = nanoid()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} user={user} />
    </AI>
  )
}
