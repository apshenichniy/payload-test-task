'use server'

import { logout } from '@payloadcms/next/auth'
import config from '@/payload.config'
import { redirect } from 'next/navigation'

export async function logoutUser() {
  try {
    await logout({
      config,
      allSessions: true,
    })

    redirect('/login')
  } catch (error) {
    console.error(error)
  }
}
