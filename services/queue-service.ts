import { delay, nextTokenNumber, queueTokens, getNextQueueNumber, branchConfig } from '@/lib/mock/db'
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
  
  // Generate realistic queue token number
  const queueInfo = getNextQueueNumber(input.service_type)
  
  const token: QueueToken = {
    id: `q_${Date.now()}`,
    token_number: queueInfo.number,
    status: 'waiting',
    counter: null,
    created_at: new Date().toISOString(),
    branch_code: branchConfig.code,
    date: queueInfo.date,
    sequence_number: queueInfo.sequenceNumber,
    estimated_wait_time: Math.floor(Math.random() * 15) + 5, // 5-20 minutes
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
