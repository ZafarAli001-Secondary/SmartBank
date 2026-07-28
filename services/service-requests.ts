import {
  delay,
  makeReference,
  serviceRequests,
} from '@/lib/mock/db'
import type {
  RequestStatus,
  ServiceRequest,
  ServiceType,
} from '@/lib/supabase/types'

export interface NewServiceRequest {
  user_id: string
  customer_name: string
  service_type: ServiceType
  amount: number | null
  details: Record<string, string | number | null>
}

export async function listServiceRequests(): Promise<ServiceRequest[]> {
  await delay(600)
  return [...serviceRequests].sort((a, b) =>
    b.created_at.localeCompare(a.created_at),
  )
}

export async function createServiceRequest(
  input: NewServiceRequest,
): Promise<ServiceRequest> {
  await delay(900)
  const now = new Date().toISOString()
  const request: ServiceRequest = {
    id: `r_${Date.now()}`,
    reference: makeReference(),
    status: 'pending',
    created_at: now,
    updated_at: now,
    ...input,
  }
  serviceRequests.unshift(request)
  return request
}

export async function updateRequestStatus(
  id: string,
  status: RequestStatus,
): Promise<ServiceRequest | null> {
  await delay(500)
  const request = serviceRequests.find((r) => r.id === id)
  if (!request) return null
  request.status = status
  request.updated_at = new Date().toISOString()
  return { ...request }
}
