export enum MessageType {
    PLAIN_TEXT = 'plainText',
    RICH_TEXT = 'richText'
}
export enum ChatType {
    USER = 'user',
    GROUP = 'group'
}
export type Message = {
    content: string
    contentType: MessageType
    chatType: ChatType
    receiver: User['id']
    sender: User['id']
    timestramp: number 
}

export type ClientMessage = Omit<Message, 'sender'>

export type User = {
    id: string;
    name: string;
    avatar: string;
}

export type Group = {
    name: string;
    avator: string;
    members?: User[];
}