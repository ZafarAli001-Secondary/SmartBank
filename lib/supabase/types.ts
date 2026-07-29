// Shared domain types. These mirror the Supabase database schema so the
// frontend can be wired to real tables with minimal changes.

export type UserRole = 'customer' | 'staff' | 'admin'

export type EmployeeRole = 'staff' | 'admin'

export type NavigationItem = {
  id: string
  label: string
  href: string
  icon?: string
  roles: EmployeeRole[]
  children?: NavigationItem[]
}

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

export interface Employee {
  id: string
  employee_id: string
  full_name: string
  username: string
  password?: string
  role: EmployeeRole
  department: string
  branch_id: string
  branch_name: string
  email: string
  phone: string
  created_at: string
  is_active: boolean
}

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
  status: 'waiting' | 'serving' | 'done' | 'called' | 'in_service' | 'completed' | 'cancelled'
  counter: number | null
  created_at: string
  branch_code?: string
  date?: string
  sequence_number?: number
  estimated_wait_time?: number
}

export interface Branch {
  id: string
  code: string
  name: string
  address: string
  contact: string
}

export interface KycDocument {
  id: string
  user_id: string
  doc_type: 'pan' | 'aadhaar' | 'address' | 'photo'
  file_name: string
  status: KycStatus
  uploaded_at: string
}

export type KioskStatus = 'online' | 'offline' | 'maintenance' | 'busy' | 'out_of_service'

export type DeviceStatus = 'online' | 'offline' | 'error' | 'busy' | 'maintenance'

export type DeviceType =
  | 'document_scanner'
  | 'receipt_printer'
  | 'qr_scanner'
  | 'barcode_scanner'
  | 'webcam'
  | 'fingerprint_scanner'
  | 'card_reader'
  | 'cash_acceptor'
  | 'signature_pad'

export interface Kiosk {
  id: string
  kiosk_id: string // e.g., "KIOSK-001"
  kiosk_name: string // e.g., "Main Hall Kiosk"
  branch_id: string
  branch_name: string
  location: string // e.g., "First Floor, Main Hall"
  installation_date: string
  status: KioskStatus
  last_heartbeat: string
  software_version: string
  current_customer: string | null
  queue_status: string
  cpu_usage: number // 0-100
  memory_usage: number // 0-100
  storage_usage: number // 0-100
  network_status: 'connected' | 'disconnected'
  uptime_hours: number
}

export interface Device {
  id: string
  device_id: string // e.g., "DEVICE-001"
  device_name: string
  device_type: DeviceType
  kiosk_id: string
  branch_id: string
  status: DeviceStatus
  last_checked: string
  firmware_version: string
  manufacturer: string
  model: string
  serial_number: string
  connection_type: 'usb' | 'network' | 'bluetooth'
  temperature: number | null
  last_activity: string
  error_count: number
  uptime_hours: number
}

export interface Alert {
  id: string
  kiosk_id: string | null
  device_id: string | null
  alert_type: string
  message: string
  severity: 'info' | 'warning' | 'critical'
  created_at: string
  resolved: boolean
}
