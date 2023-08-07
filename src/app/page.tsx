'use client'
import { FilledInput, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export default function Home() {
  const [userName, setUserName] = useState('')
  const router = useRouter()
  const gotoChatPage = useCallback(() => {
    document.cookie = `user-name=${userName}`
    router.push('/chat')
  },[userName])
  return (
    <main className="flex min-h-screen p-24">
      <div className='m-auto space-x-2'>
        <FilledInput placeholder='enter user name' value={userName} onChange={e => setUserName(e.target.value)} />
        <Button onClick={gotoChatPage}>Go</Button>
      </div>

    </main>
  )
}
