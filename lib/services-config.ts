import type { ServiceType } from '@/lib/supabase/types'
import {
  Banknote,
  ArrowLeftRight,
  ReceiptText,
  ShieldCheck,
  Ticket,
  Wallet,
  LayoutGrid,
  HandCoins,
  type LucideIcon,
} from 'lucide-react'

export interface ServiceDef {
  type: ServiceType
  title: string
  description: string
  icon: LucideIcon
}

export const SERVICES: ServiceDef[] = [
  {
    type: 'cash_deposit',
    title: 'Cash Deposit',
    description: 'Deposit cash into any account',
    icon: HandCoins,
  },
  {
    type: 'cash_withdrawal',
    title: 'Cash Withdrawal',
    description: 'Withdraw cash from your account',
    icon: Banknote,
  },
  {
    type: 'fund_transfer',
    title: 'Fund Transfer',
    description: 'Send money to a beneficiary',
    icon: ArrowLeftRight,
  },
  {
    type: 'cheque_deposit',
    title: 'Cheque Deposit',
    description: 'Deposit a cheque for clearing',
    icon: ReceiptText,
  },
  {
    type: 'digital_kyc',
    title: 'Digital KYC',
    description: 'Upload and verify documents',
    icon: ShieldCheck,
  },
  {
    type: 'queue_token',
    title: 'Generate Queue Token',
    description: 'Get a token for counter service',
    icon: Ticket,
  },
  {
    type: 'account_balance',
    title: 'Account Balance',
    description: 'Balance, statement & rates',
    icon: Wallet,
  },
  {
    type: 'more_services',
    title: 'More Services',
    description: 'Loans, FD rates & profile',
    icon: LayoutGrid,
  },
]

export const SERVICE_LABELS: Record<ServiceType, string> = {
  cash_deposit: 'Cash Deposit',
  cash_withdrawal: 'Cash Withdrawal',
  fund_transfer: 'Fund Transfer',
  cheque_deposit: 'Cheque Deposit',
  digital_kyc: 'Digital KYC',
  queue_token: 'Queue Token',
  account_balance: 'Account Balance',
  more_services: 'More Services',
}

export interface RateRow {
  name: string
  rate: string
  detail: string
}

export const LOAN_RATES: RateRow[] = [
  { name: 'Home Loan', rate: '8.35%', detail: 'p.a. · up to 30 yrs' },
  { name: 'Personal Loan', rate: '10.99%', detail: 'p.a. · up to 5 yrs' },
  { name: 'Car Loan', rate: '9.10%', detail: 'p.a. · up to 7 yrs' },
  { name: 'Education Loan', rate: '8.65%', detail: 'p.a. · up to 15 yrs' },
  { name: 'Gold Loan', rate: '9.50%', detail: 'p.a. · up to 3 yrs' },
]

export const FD_RATES: RateRow[] = [
  { name: '7 – 45 days', rate: '3.50%', detail: 'General public' },
  { name: '46 – 179 days', rate: '5.75%', detail: 'General public' },
  { name: '180 – 364 days', rate: '6.50%', detail: 'General public' },
  { name: '1 – 2 years', rate: '7.10%', detail: '+0.50% seniors' },
  { name: '2 – 5 years', rate: '7.25%', detail: '+0.50% seniors' },
]

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'தமிழ்' },
]

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)
}
