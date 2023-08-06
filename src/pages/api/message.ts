import { getUserInfo } from "@/data/user";
import { postMessage } from '@/data/message'
import { Message } from "@/types/types";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(reqeust: NextApiRequest, res: NextApiResponse) {
    const messageInfo = JSON.parse(reqeust.body) as Message;
    const user = await getUserInfo({ userName: reqeust.cookies['user-name'] || '' });
    await postMessage({
        ...messageInfo,
        sender: user?._id?.toString() || '',
    })
    return res.json({})
}