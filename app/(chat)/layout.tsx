import { Header } from '@/components/header/header'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <>
      <Header />

      <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
        {children}
      </div>
    </>
  )
}
