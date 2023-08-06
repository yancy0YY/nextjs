
'use client'
import useContactList from "@/hooks/useContactList";
import { Message } from "@/types/types";
import { ThemeProvider, createTheme } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from "react";
import io from 'socket.io-client';
import ChatList from "./chat-list";
import ContactList from "./contactList";
import SendMessageBox from "./send-message-box";


const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

let socket

export default function ChatLayout() {
    const contact = useContactList()
    const [currentChat, setCurrentChat] = useState<string>('')
    const [chatMessageMap, setChatMessageMap] = useState<Record<string, Message[]>>({})
    const messages = useMemo(() => chatMessageMap[currentChat], [chatMessageMap, currentChat])
    const saveMessage = useCallback((userId: string, message: Message) => {
        setChatMessageMap(pre => {
            if (pre[userId]) {
                pre[userId].push(message)
            } else {
                pre[userId] = [message]
            }
            return { ...pre }
        })
    }, [setChatMessageMap])
    useEffect(() => {
        fetch('/api/socket').then(() => {
            socket = io({
                path: '/api/socket_io'
            });
            socket.on('message', (message) => {
                const { sender } = message;
                saveMessage(sender, message)
            })
        })
    }, [])

    return <ThemeProvider theme={darkTheme}>
        <div className="flex items-stretch h-full bg-black text-white">
            <div className="w-80 bg-neutral-900">
                <ContactList contactList={contact} currentChat={currentChat} onCurrentChatChange={setCurrentChat} />
            </div>
            <div className="flex-1 flex flex-col bg-neutral-800 divide-y divide-white">
                <div className="flex-1"><ChatList messages={messages} currentChat={currentChat} /></div>

                {currentChat && <div>
                    <SendMessageBox currentChat={currentChat} onSubmit={saveMessage} />
                </div>}
            </div>
        </div>
    </ThemeProvider>

}