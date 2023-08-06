import { Server, Socket } from 'socket.io'
import { NextApiRequest, NextApiResponse } from "next";
import userEventCenter from '@/userEventCenter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //@ts-ignore
    if (!res.socket.server.io) {
        console.log('Socket is initializing');
        //@ts-ignore
        const io = new Server(res.socket.server, {
            path: '/api/socket_io',
            //@ts-ignore
            addTrailingSlash: false
        });
        //@ts-ignore
        res.socket.server.io = io;

        io.on('connect', async (socket: Socket) => {
            const userName = socket.handshake.headers['cookie']?.split(';').find(e => e.includes('user-name'))?.split('=')[1]
            console.log(`user ${userName} connected`)
            if (userName) {

                userEventCenter.set(userName, socket)
            }

        })
        io.on('disconnect', async () => {
            console.log('disconnect')
            const userName = req.cookies['user-name'] || ''
            if (userName) {

                userEventCenter.delete(userName)
            }
        })
    }
    console.log('Socket is already running')
    res.end()
}