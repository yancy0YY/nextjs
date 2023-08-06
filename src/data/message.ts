import { getChatDBConnection } from "@/lib/mongoDB";
import { Message } from "@/types/types";
import { sendEvent } from "@/userEventCenter";

export async function postMessage(message: Message) {
    const chatDB = await getChatDBConnection();
    const _message = { ...message, timestramp: Date.now() };
    await Promise.all([sendEvent(_message), chatDB.collection('message').insertOne(_message)])

}