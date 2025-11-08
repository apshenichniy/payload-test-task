import config from '@/payload.config'
import { BasePayload, getPayload as getPayloadFn } from 'payload'

export async function getPayload(): Promise<BasePayload> {
  const payload = await getPayloadFn({ config })
  return payload
}
