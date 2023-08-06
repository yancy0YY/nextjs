import request from '@/lib/request';
import { ChatType, Message, MessageType } from '@/types/types';
import { TextField } from '@mui/material'
import { KeyboardEventHandler, useCallback } from 'react'
export default function SendMessageBox({ currentChat, onSubmit }: { currentChat: string; onSubmit: (userId: string, message: Message) => void }) {
    const onSendMessage: KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const messageContent = (event.target as any).value;
            const clientMessage = {
                content: messageContent,
                contentType: MessageType.PLAIN_TEXT,
                chatType: ChatType.USER,
                receiver: currentChat,
                timestramp: Date.now(),
                sender: ''
            };
            console.log(`send message(${messageContent}) to user|group ${currentChat}`)
            onSubmit(currentChat, clientMessage)
            request('/api/message', {
                method: 'POST', body: JSON.stringify({
                    content: messageContent,
                    contentType: MessageType.PLAIN_TEXT,
                    chatType: ChatType.USER,
                    receiver: currentChat
                })
            });
            (event.target as any).value = ''

        }

    }, [currentChat])
    return <TextField onKeyDown={onSendMessage} className='w-full' multiline maxRows={5} minRows={5} />
}