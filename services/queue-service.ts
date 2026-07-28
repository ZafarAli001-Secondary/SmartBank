import { delay, nextTokenNumber, queueTokens } from '@/lib/mock/db'
import type { QueueToken, ServiceType } from '@/lib/supabase/types'

export async function listQueueTokens(): Promise<QueueToken[]> {
  await delay(400)
  return [...queueTokens]
}

export async function generateToken(input: {
  user_id: string | null
  customer_name: string
  service_type: ServiceType
}): Promise<QueueToken> {
  await delay(700)
  const token: QueueToken = {
    id: `q_${Date.now()}`,
    token_number: nextTokenNumber(),
    status: 'waiting',
    counter: null,
    created_at: new Date().toISOString(),
    ...input,
  }
  queueTokens.push(token)
  return token
}

export async function callNextToken(): Promise<QueueToken | null> {
  await delay(400)
  const serving = queueTokens.find((t) => t.status === 'serving')
  if (serving) serving.status = 'done'
  const next = queueTokens.find((t) => t.status === 'waiting')
  if (next) {
    next.status = 'serving'
    next.counter = 3
    return { ...next }
  }
  return null
}

export function getQueueStats(tokens: QueueToken[]) {
  const waiting = tokens.filter((t) => t.status === 'waiting').length
  const serving = tokens.find((t) => t.status === 'serving') ?? null
  return { waiting, serving }
}
