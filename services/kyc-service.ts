import {
  delay,
  kycDocuments,
  makeReference,
  setProfileKycStatus,
} from '@/lib/mock/db'
import type { KycDocument } from '@/lib/supabase/types'

export type KycDocType = KycDocument['doc_type']

export interface KycSubmission {
  user_id: string
  documents: { doc_type: KycDocType; file_name: string }[]
}

export interface KycResult {
  reference: string
  documents: KycDocument[]
}

export async function listKycDocuments(
  userId: string,
): Promise<KycDocument[]> {
  await delay(400)
  return kycDocuments.filter((d) => d.user_id === userId)
}

export async function submitKyc(input: KycSubmission): Promise<KycResult> {
  await delay(1100)
  const uploadedAt = new Date().toISOString()
  const created: KycDocument[] = input.documents.map((doc, i) => ({
    id: `kyc_${Date.now()}_${i}`,
    user_id: input.user_id,
    doc_type: doc.doc_type,
    file_name: doc.file_name,
    status: 'pending',
    uploaded_at: uploadedAt,
  }))
  kycDocuments.push(...created)
  setProfileKycStatus(input.user_id, 'pending')
  return { reference: makeReference(), documents: created }
}
