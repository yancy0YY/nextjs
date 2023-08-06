import { User } from '@/types/types';
import { Avatar } from '@mui/material'
import { MouseEventHandler, useState } from 'react'
function ContactItem({ item, selected, onClick }: { item: User, selected?: boolean, onClick?: MouseEventHandler<HTMLDivElement> }) {
    return <div className={`flex space-x-2 p-4 ${selected ? 'bg-neutral-800' : ''}`} onClick={onClick}><Avatar src={item.avatar} /><div>{item.name}</div></div>
}

export default function ContactList({ contactList, currentChat, onCurrentChatChange }: { contactList: User[], currentChat: string; onCurrentChatChange: (id: string) => void }) {

    return contactList?.map(item => <ContactItem key={item.id} item={item} selected={currentChat === item.id} onClick={() => onCurrentChatChange(item.id)} />)
}