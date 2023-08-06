import { getContactList } from "@/data/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(reqeust: NextRequest) {
    const userName = reqeust.cookies.get('user-name')?.value;
    console.log(userName)
    if (userName) {
        const res = await getContactList(userName)
        return NextResponse.json({ list: res })
    }
    return NextResponse.json({ list: [] })
}
