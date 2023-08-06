import request from "@/lib/request";
import { useEffect, useState } from "react";

export default function useContactList() {
    const [contact, setContact] = useState([])
    useEffect(() => {
        request('/api/contact').then(res => setContact(res.list))
    }, [])
    return contact
}