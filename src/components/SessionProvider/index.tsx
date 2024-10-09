'use client'

import {useEffect} from 'react'

import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'

import type React from 'react'

interface Props {
  children: React.ReactNode
}

export default function SessionProvider({children}: Props) {
  const setUser = useUser(state => state.setUser)

  const supabase = createBrowserClient()

  const readSession = async () => {
    const {data: userSession} = await supabase.auth.getSession()

    if (userSession.session) {
      const {data} = await supabase
        .from('users')
        .select('*')
        .eq('id', userSession.session.user.id)
        .single()

      setUser({
        ...data,
        id: data?.id ?? '',
        role: data?.role ?? '',
        email: data?.email ?? '',
        created_at: data?.created_at ?? new Date().toISOString(),
        nickname: userSession.session.user.user_metadata.user_name ?? '',
      })
    }
  }

  useEffect(() => {
    readSession()
    // eslint-disable-next-line
  }, [])

  return <>{children}</>
}
