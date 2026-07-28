// In-memory mock database. Simulates the shape of Supabase tables and adds a
// small artificial latency so loading/skeleton states are exercised. All data
// resets on page reload — this is intentional for a frontend-only preview.

import type {
  Account,
  Profile,
  QueueToken,
  ServiceRequest,
  Transaction,
} from '@/lib/supabase/types'

export function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function makeReference() {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `SBK${n}`
}

export const profiles: Profile[] = [
  {
    id: 'u_customer',
    full_name: 'Aarav Sharma',
    username: 'customer',
    role: 'customer',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@example.com',
    avatar_url: null,
    kyc_status: 'verified',
    created_at: '2023-04-12T09:00:00Z',
  },
  {
    id: 'u_staff',
    full_name: 'Priya Nair',
    username: 'staff',
    role: 'staff',
    phone: '+91 90000 11111',
    email: 'priya.nair@smartbank.example',
    avatar_url: null,
    kyc_status: 'verified',
    created_at: '2022-01-05T09:00:00Z',
  },
  {
    id: 'u_admin',
    full_name: 'Rohan Mehta',
    username: 'admin',
    role: 'admin',
    phone: '+91 90000 22222',
    email: 'rohan.mehta@smartbank.example',
    avatar_url: null,
    kyc_status: 'verified',
    created_at: '2021-08-19T09:00:00Z',
  },
]

export const accounts: Account[] = [
  {
    id: 'acc_1',
    user_id: 'u_customer',
    account_number: '5012 8834 2201',
    account_type: 'savings',
    balance: 184320.75,
    currency: 'INR',
    branch: 'MG Road, Bengaluru',
    ifsc: 'SBKI0000123',
  },
]

let txnSeed = 892450
function nextBalance(delta: number) {
  txnSeed += delta
  return txnSeed
}

export const transactions: Transaction[] = [
  {
    id: 't1',
    account_id: 'acc_1',
    type: 'credit',
    amount: 45000,
    description: 'Salary credit — Acme Corp',
    balance_after: 184320.75,
    created_at: '2026-07-25T10:12:00Z',
  },
  {
    id: 't2',
    account_id: 'acc_1',
    type: 'debit',
    amount: 2499,
    description: 'UPI — Electricity Board',
    balance_after: 139320.75,
    created_at: '2026-07-24T18:44:00Z',
  },
  {
    id: 't3',
    account_id: 'acc_1',
    type: 'debit',
    amount: 1200,
    description: 'ATM Withdrawal — MG Road',
    balance_after: 141819.75,
    created_at: '2026-07-23T13:05:00Z',
  },
  {
    id: 't4',
    account_id: 'acc_1',
    type: 'credit',
    amount: 8000,
    description: 'IMPS — R. Mehta',
    balance_after: 143019.75,
    created_at: '2026-07-22T09:30:00Z',
  },
  {
    id: 't5',
    account_id: 'acc_1',
    type: 'debit',
    amount: 15600,
    description: 'Card — Big Bazaar',
    balance_after: 135019.75,
    created_at: '2026-07-20T20:15:00Z',
  },
]

// eslint-disable-next-line prefer-const
export let serviceRequests: ServiceRequest[] = [
  {
    id: 'r1',
    reference: 'SBK774213',
    user_id: 'u_customer',
    customer_name: 'Aarav Sharma',
    service_type: 'cash_withdrawal',
    amount: 12000,
    status: 'pending',
    details: { account_number: '5012 8834 2201', remarks: 'Household' },
    created_at: '2026-07-28T08:41:00Z',
    updated_at: '2026-07-28T08:41:00Z',
  },
  {
    id: 'r2',
    reference: 'SBK118902',
    user_id: 'u2',
    customer_name: 'Neha Gupta',
    service_type: 'fund_transfer',
    amount: 25000,
    status: 'pending',
    details: {
      from_account: '5012 8834 9931',
      to_account: '6621 0034 2214',
      beneficiary: 'S. Kulkarni',
    },
    created_at: '2026-07-28T08:52:00Z',
    updated_at: '2026-07-28T08:52:00Z',
  },
  {
    id: 'r3',
    reference: 'SBK550120',
    user_id: 'u3',
    customer_name: 'Vikram Singh',
    service_type: 'cash_deposit',
    amount: 60000,
    status: 'approved',
    details: { account_number: '4410 2231 7788', depositor_name: 'Vikram Singh' },
    created_at: '2026-07-28T08:20:00Z',
    updated_at: '2026-07-28T08:33:00Z',
  },
  {
    id: 'r4',
    reference: 'SBK330071',
    user_id: 'u4',
    customer_name: 'Meera Iyer',
    service_type: 'cheque_deposit',
    amount: 18500,
    status: 'completed',
    details: { account_number: '7781 4420 1123', cheque_number: '004512' },
    created_at: '2026-07-28T07:58:00Z',
    updated_at: '2026-07-28T08:10:00Z',
  },
]

// eslint-disable-next-line prefer-const
export let queueTokens: QueueToken[] = [
  {
    id: 'q1',
    token_number: 'A-104',
    user_id: 'u3',
    customer_name: 'Vikram Singh',
    service_type: 'cash_deposit',
    status: 'serving',
    counter: 3,
    created_at: '2026-07-28T08:30:00Z',
  },
  {
    id: 'q2',
    token_number: 'A-105',
    user_id: 'u4',
    customer_name: 'Meera Iyer',
    service_type: 'cheque_deposit',
    status: 'waiting',
    counter: null,
    created_at: '2026-07-28T08:34:00Z',
  },
  {
    id: 'q3',
    token_number: 'A-106',
    user_id: 'u2',
    customer_name: 'Neha Gupta',
    service_type: 'fund_transfer',
    status: 'waiting',
    counter: null,
    created_at: '2026-07-28T08:39:00Z',
  },
]

let tokenCounter = 106

export function nextTokenNumber() {
  tokenCounter += 1
  return `A-${tokenCounter}`
}

export { nextBalance }
