import { Socket } from "socket.io";
import { Message } from "./types/types";
import { getUserInfo } from "./data/user";
import { GlobalRef } from "./lib/globalRef";

const userSocketMapRef = 'userSocketMap'
if(!(global as any)[userSocketMapRef]){    
    (global as any)[userSocketMapRef] = new Map<string, Socket>()
}

const userSocketMap: Map<string, Socket> = (global as any)[userSocketMapRef]

async function sendEvent(message: Message) {
    const user = await getUserInfo({ _id: message.receiver })
    console.log(
        'send message to ', user?.name
    )
    if (user && userSocketMap.has(user.name)) {
        const socket = userSocketMap.get(user.name);
        if (socket?.connected) {
            socket.emit('message', {
                sender: message.sender,
                content: message.content,
                contentType: message.contentType,
                timestramp: message.timestramp
            })
        }
    }
}
export default userSocketMap
export { sendEvent }