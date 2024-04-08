'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { toast } from 'sonner'

import { ServerActionResult, type Chat } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { IconSpinner } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

interface ChatShareDialogProps extends DialogProps {
  chat: Chat
  shareChat?: (chat: Chat) => ServerActionResult<void>
  onCopy: () => void
}

type SharingButtonState = 'default' | 'pending' | 'done'

export function ChatShareDialog({
  chat,
  shareChat,
  onCopy,
  ...props
}: ChatShareDialogProps) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [isSharePending, setIsSharePending] =
    useState<SharingButtonState>('default')

  const copyShareLink = async (chat: Chat) => {
    setIsSharePending('pending')
    const supabase = createClient()
    const newChat = {
      ...chat,
      share_path: `/share/${chat.id}`
    }

    const { data, error } = await supabase
      .from('chats')
      .update(newChat)
      .eq('id', chat.id)

    if (error) {
      toast.error('Error sharing chat')
      return
    }

    copyToClipboard(window.location.origin + newChat.share_path)
    setIsSharePending('done')
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link to chat</DialogTitle>
          <DialogDescription>
            Anyone with the URL will be able to view the shared chat.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-1 text-sm border rounded-md">
          <div className="font-medium">{chat.title}</div>
          <div className="text-muted-foreground">
            {chat.messages.length} messages
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button
            disabled={isSharePending === 'pending'}
            onClick={() => {
              copyShareLink(chat)
            }}
          >
            {isSharePending === 'pending' ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              <>{isSharePending === 'default' ? 'Copy Link' : 'Copied!'}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
