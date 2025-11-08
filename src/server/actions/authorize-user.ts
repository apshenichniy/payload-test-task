'use server'

import { login } from '@payloadcms/next/auth'
import config from '@payload-config'

/**
 * Authorize a user
 * @param formData - The form data containing the email and password
 * @returns {Promise<{success: boolean, error?: string}>} - The result of the authorization
 */
export async function authorizeUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    await login({
      collection: 'users',
      config,
      email,
      password,
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'Login failed' }
  }
}
