import { LoginForm } from '@/components/login-form'
import { getPayloadUser } from '@/lib/get-payload-user'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default async function LoginPage() {
  // check if user is already logged in
  const user = await getPayloadUser()

  // if user is already logged in, redirect to home page
  if (user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
