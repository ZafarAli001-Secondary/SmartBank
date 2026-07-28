// Shared domain types. These mirror the Supabase database schema so the
// frontend can be wired to real tables with minimal changes.

export type UserRole = 'customer' | 'staff' | 'admin'

export type ServiceType =
  | 'cash_deposit'
  | 'cash_withdrawal'
  | 'fund_transfer'
  | 'cheque_deposit'
  | 'digital_kyc'
  | 'queue_token'
  | 'account_balance'
  | 'more_services'

export type RequestStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'completed'

export type KycStatus = 'not_submitted' | 'pending' | 'verified' | 'rejected'

export interface Profile {
  id: string
  full_name: string
  username: string
  role: UserRole
  phone: string
  email: string
  avatar_url: string | null
  kyc_status: KycStatus
  created_at: string
}

export interface Account {
  id: string
  user_id: string
  account_number: string
  account_type: 'savings' | 'current'
  balance: number
  currency: string
  branch: string
  ifsc: string
}

export interface Transaction {
  id: string
  account_id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  balance_after: number
  created_at: string
}

export interface ServiceRequest {
  id: string
  reference: string
  user_id: string
  customer_name: string
  service_type: ServiceType
  amount: number | null
  status: RequestStatus
  // Free-form details for the specific service (account numbers, remarks, etc.)
  details: Record<string, string | number | null>
  created_at: string
  updated_at: string
}

export interface QueueToken {
  id: string
  token_number: string
  user_id: string | null
  customer_name: string
  service_type: ServiceType
  status: 'waiting' | 'serving' | 'done'
  counter: number | null
  created_at: string
}

export interface KycDocument {
  id: string
  user_id: string
  doc_type: 'pan' | 'aadhaar' | 'address' | 'photo'
  file_name: string
  status: KycStatus
  uploaded_at: string
}
