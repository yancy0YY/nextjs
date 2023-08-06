import { getChatDBConnection } from "@/lib/mongoDB";
import { ObjectId } from 'mongodb'

export async function getUserInfo({ userName, _id }: { userName?: string, _id?: string }) {
    const chatDB = await getChatDBConnection();
    const query = _id ? { _id: new ObjectId(_id) } : { name: userName } as Record<string, any>;
    const userInfo = await chatDB.collection('user').findOne(query);
    return userInfo
}

export async function getContactList(userName: string) {
    const chatDB = await getChatDBConnection();
    const res = await chatDB.collection('user').aggregate([
        { $match: { "name": userName } },
        {
            $lookup: {
                from: "user",
                localField: "friends",
                foreignField: "_id",
                as: "friendList"
            }
        }
    ]).toArray()
    return res[0]?.friendList.map((e: Record<string, any>) => ({
        id: e._id,
        name: e.name,
        avatar: e.avatar
    })) || []
}