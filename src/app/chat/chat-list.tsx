import { Message } from "@/types/types";

export default function MessagesList(props: { messages: Partial<Message>[]; currentChat: string }) {

    return <div>
        {props.messages?.map(message => <div
            key={message.timestramp}
            className={`w-full p-2`}
        >
            <div className={`w-fit p-2 rounded ${message.sender === props.currentChat ? 'bg-slate-600 mr-auto' : 'bg-green-300 text-black ml-auto'}`}>{message.content}</div>
        </div>)}
    </div>
}