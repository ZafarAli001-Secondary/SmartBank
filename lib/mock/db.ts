// In-memory mock database. Simulates the shape of Supabase tables and adds a
// small artificial latency so loading/skeleton states are exercised. All data
// resets on page reload — this is intentional for a frontend-only preview.

import type {
  Account,
  Alert,
  Branch,
  Device,
  Kiosk,
  KycDocument,
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

// Branch configuration
export const branchConfig: Branch = {
  id: 'branch_bhl',
  code: 'BHL',
  name: 'MG Road, Bengaluru',
  address: '123 MG Road, Bengaluru 560001, Karnataka',
  contact: '+91 80 4077 0000',
}

// Customer database with mobile numbers for kiosk login
const customerMobileMap: Record<string, string> = {
  '9876543210': 'u_customer',
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

// Mock OTP service
let mockOtp: string | null = null
let mockOtpTimestamp: number | null = null
const OTP_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes

export function generateOtp(): string {
  mockOtp = String(Math.floor(100000 + Math.random() * 900000))
  mockOtpTimestamp = Date.now()
  console.log('[v0] Mock OTP generated:', mockOtp)
  return mockOtp
}

export function verifyOtp(otp: string): boolean {
  if (!mockOtp || !mockOtpTimestamp) return false
  if (Date.now() - mockOtpTimestamp > OTP_EXPIRY_MS) {
    mockOtp = null
    mockOtpTimestamp = null
    return false
  }
  return otp === mockOtp
}

// Daily queue counters per service type
const queueCounters: Record<string, number> = {
  cash_deposit: 0,
  cash_withdrawal: 0,
  fund_transfer: 0,
  cheque_deposit: 0,
  digital_kyc: 0,
  account_balance: 0,
}

function getTodayDateString(): string {
  const now = new Date()
  return now.toISOString().split('T')[0].replace(/-/g, '')
}

export function getNextQueueNumber(serviceType: string): {
  number: string
  sequenceNumber: number
  date: string
} {
  const counter = (queueCounters[serviceType] ?? 0) + 1
  queueCounters[serviceType] = counter
  const date = getTodayDateString()
  const sequencePadded = String(counter).padStart(3, '0')
  const serviceCode = getServiceCode(serviceType)
  const number = `SB-${branchConfig.code}-${serviceCode}-${date}-${sequencePadded}`
  return { number, sequenceNumber: counter, date }
}

function getServiceCode(serviceType: string): string {
  const codes: Record<string, string> = {
    cash_deposit: 'CASH',
    cash_withdrawal: 'CASH',
    fund_transfer: 'FUND',
    cheque_deposit: 'CHK',
    digital_kyc: 'KYC',
    account_balance: 'BAL',
  }
  return codes[serviceType] ?? 'GEN'
}

let tokenCounter = 106

export function nextTokenNumber() {
  tokenCounter += 1
  return `A-${tokenCounter}`
}

export function getCustomerByMobileNumber(mobileNumber: string): Profile | null {
  const userId = customerMobileMap[mobileNumber]
  if (!userId) return null
  return profiles.find((p) => p.id === userId) ?? null
}

// eslint-disable-next-line prefer-const
export let kycDocuments: KycDocument[] = []

// Kiosk data
// eslint-disable-next-line prefer-const
export let kiosks: Kiosk[] = [
  {
    id: 'kiosk_1',
    kiosk_id: 'KIOSK-001',
    kiosk_name: 'Main Hall Kiosk 1',
    branch_id: 'branch_bhl',
    branch_name: 'MG Road, Bengaluru',
    location: 'First Floor, Main Hall',
    installation_date: '2025-01-15T00:00:00Z',
    status: 'online',
    last_heartbeat: new Date().toISOString(),
    software_version: '2.1.0',
    current_customer: 'Aarav Sharma',
    queue_status: 'A-105 serving',
    cpu_usage: 35,
    memory_usage: 48,
    storage_usage: 62,
    network_status: 'connected',
    uptime_hours: 168,
  },
  {
    id: 'kiosk_2',
    kiosk_id: 'KIOSK-002',
    kiosk_name: 'Main Hall Kiosk 2',
    branch_id: 'branch_bhl',
    branch_name: 'MG Road, Bengaluru',
    location: 'First Floor, Main Hall',
    installation_date: '2025-01-15T00:00:00Z',
    status: 'online',
    last_heartbeat: new Date().toISOString(),
    software_version: '2.1.0',
    current_customer: null,
    queue_status: 'A-106 waiting',
    cpu_usage: 12,
    memory_usage: 28,
    storage_usage: 58,
    network_status: 'connected',
    uptime_hours: 168,
  },
  {
    id: 'kiosk_3',
    kiosk_id: 'KIOSK-003',
    kiosk_name: 'Ground Floor Kiosk',
    branch_id: 'branch_bhl',
    branch_name: 'MG Road, Bengaluru',
    location: 'Ground Floor, Lobby',
    installation_date: '2025-02-01T00:00:00Z',
    status: 'offline',
    last_heartbeat: '2026-07-28T06:45:00Z',
    software_version: '2.1.0',
    current_customer: null,
    queue_status: 'No service',
    cpu_usage: 0,
    memory_usage: 0,
    storage_usage: 55,
    network_status: 'disconnected',
    uptime_hours: 0,
  },
  {
    id: 'kiosk_4',
    kiosk_id: 'KIOSK-004',
    kiosk_name: 'VIP Lounge Kiosk',
    branch_id: 'branch_bhl',
    branch_name: 'MG Road, Bengaluru',
    location: 'Second Floor, VIP Lounge',
    installation_date: '2025-02-10T00:00:00Z',
    status: 'maintenance',
    last_heartbeat: '2026-07-28T08:00:00Z',
    software_version: '2.0.9',
    current_customer: null,
    queue_status: 'Under Maintenance',
    cpu_usage: 0,
    memory_usage: 0,
    storage_usage: 60,
    network_status: 'connected',
    uptime_hours: 0,
  },
]

// Device data
// eslint-disable-next-line prefer-const
export let devices: Device[] = [
  {
    id: 'dev_1',
    device_id: 'DEVICE-001',
    device_name: 'Document Scanner - Kiosk 1',
    device_type: 'document_scanner',
    kiosk_id: 'kiosk_1',
    branch_id: 'branch_bhl',
    status: 'online',
    last_checked: new Date().toISOString(),
    firmware_version: '3.2.1',
    manufacturer: 'Canon',
    model: 'imageFORMULA DR-C125',
    serial_number: 'SN12345678',
    connection_type: 'usb',
    temperature: 35,
    last_activity: new Date().toISOString(),
    error_count: 0,
    uptime_hours: 168,
  },
  {
    id: 'dev_2',
    device_id: 'DEVICE-002',
    device_name: 'Receipt Printer - Kiosk 1',
    device_type: 'receipt_printer',
    kiosk_id: 'kiosk_1',
    branch_id: 'branch_bhl',
    status: 'online',
    last_checked: new Date().toISOString(),
    firmware_version: '1.8.0',
    manufacturer: 'Epson',
    model: 'TM-T88VI',
    serial_number: 'SN87654321',
    connection_type: 'usb',
    temperature: 42,
    last_activity: new Date().toISOString(),
    error_count: 0,
    uptime_hours: 168,
  },
  {
    id: 'dev_3',
    device_id: 'DEVICE-003',
    device_name: 'Card Reader - Kiosk 1',
    device_type: 'card_reader',
    kiosk_id: 'kiosk_1',
    branch_id: 'branch_bhl',
    status: 'online',
    last_checked: new Date().toISOString(),
    firmware_version: '2.5.3',
    manufacturer: 'Ingenico',
    model: 'DESK/3500',
    serial_number: 'SN11223344',
    connection_type: 'network',
    temperature: null,
    last_activity: new Date().toISOString(),
    error_count: 0,
    uptime_hours: 168,
  },
  {
    id: 'dev_4',
    device_id: 'DEVICE-004',
    device_name: 'Webcam - Kiosk 1',
    device_type: 'webcam',
    kiosk_id: 'kiosk_1',
    branch_id: 'branch_bhl',
    status: 'online',
    last_checked: new Date().toISOString(),
    firmware_version: '1.0.0',
    manufacturer: 'Logitech',
    model: 'C920',
    serial_number: 'SN55667788',
    connection_type: 'usb',
    temperature: 32,
    last_activity: new Date().toISOString(),
    error_count: 0,
    uptime_hours: 168,
  },
  {
    id: 'dev_5',
    device_id: 'DEVICE-005',
    device_name: 'Fingerprint Scanner - Kiosk 1',
    device_type: 'fingerprint_scanner',
    kiosk_id: 'kiosk_1',
    branch_id: 'branch_bhl',
    status: 'error',
    last_checked: new Date().toISOString(),
    firmware_version: '2.1.2',
    manufacturer: 'IDEMIA',
    model: 'PRECISEHAND',
    serial_number: 'SN99887766',
    connection_type: 'usb',
    temperature: 45,
    last_activity: '2026-07-28T08:15:00Z',
    error_count: 3,
    uptime_hours: 160,
  },
  {
    id: 'dev_6',
    device_id: 'DEVICE-006',
    device_name: 'Document Scanner - Kiosk 2',
    device_type: 'document_scanner',
    kiosk_id: 'kiosk_2',
    branch_id: 'branch_bhl',
    status: 'online',
    last_checked: new Date().toISOString(),
    firmware_version: '3.2.1',
    manufacturer: 'Canon',
    model: 'imageFORMULA DR-C125',
    serial_number: 'SN12345679',
    connection_type: 'usb',
    temperature: 33,
    last_activity: new Date().toISOString(),
    error_count: 0,
    uptime_hours: 168,
  },
  {
    id: 'dev_7',
    device_id: 'DEVICE-007',
    device_name: 'Receipt Printer - Kiosk 3',
    device_type: 'receipt_printer',
    kiosk_id: 'kiosk_3',
    branch_id: 'branch_bhl',
    status: 'offline',
    last_checked: '2026-07-28T06:30:00Z',
    firmware_version: '1.8.0',
    manufacturer: 'Epson',
    model: 'TM-T88VI',
    serial_number: 'SN87654322',
    connection_type: 'usb',
    temperature: null,
    last_activity: '2026-07-28T06:30:00Z',
    error_count: 2,
    uptime_hours: 0,
  },
]

// Alerts
// eslint-disable-next-line prefer-const
export let alerts: Alert[] = [
  {
    id: 'alert_1',
    kiosk_id: null,
    device_id: 'dev_5',
    alert_type: 'device_error',
    message: 'Fingerprint Scanner disconnected - Kiosk 1',
    severity: 'critical',
    created_at: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
    resolved: false,
  },
  {
    id: 'alert_2',
    kiosk_id: 'kiosk_3',
    device_id: null,
    alert_type: 'kiosk_offline',
    message: 'Ground Floor Kiosk - Network disconnected',
    severity: 'critical',
    created_at: new Date(Date.now() - 90 * 60000).toISOString(), // 90 minutes ago
    resolved: false,
  },
  {
    id: 'alert_3',
    kiosk_id: 'kiosk_1',
    device_id: null,
    alert_type: 'storage_warning',
    message: 'Storage usage at 62% - Kiosk 1',
    severity: 'warning',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    resolved: false,
  },
  {
    id: 'alert_4',
    kiosk_id: null,
    device_id: 'dev_2',
    alert_type: 'printer_warning',
    message: 'Paper level low - Receipt Printer Kiosk 1',
    severity: 'warning',
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    resolved: false,
  },
]

export function setProfileKycStatus(
  userId: string,
  status: Profile['kyc_status'],
) {
  const profile = profiles.find((p) => p.id === userId)
  if (profile) profile.kyc_status = status
}

export { nextBalance }
