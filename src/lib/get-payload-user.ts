import { getPayload } from './get-payload'
import { headers as getHeaders } from 'next/headers.js'

export async function getPayloadUser() {
  const headers = await getHeaders()
  const payload = await getPayload()
  const { user } = await payload.auth({ headers })

  return user
}
