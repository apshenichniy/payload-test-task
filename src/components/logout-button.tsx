'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { logoutUser } from '@/server/actions/logout-user'

const LogoutButtonInner = () => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? 'Logging out...' : 'Logout'}
    </Button>
  )
}

export const LogoutButton = () => {
  return (
    <form action={logoutUser}>
      <LogoutButtonInner />
    </form>
  )
}
