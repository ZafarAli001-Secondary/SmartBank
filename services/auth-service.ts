import {
  delay,
  profiles,
  branchConfig,
  getCustomerByMobileNumber,
  generateOtp as mockGenerateOtp,
  verifyOtp as mockVerifyOtp,
  accounts,
} from '@/lib/mock/db'
import type { Profile, UserRole, Account } from '@/lib/supabase/types'

// Mimics Supabase Auth. Swap the body for
// `supabase.auth.signInWithPassword(...)` + a profiles query when connecting a
// real backend. Any password is accepted in the mock; the role selector picks
// the demo account.

export async function signIn(
  username: string,
  _password: string,
  role: UserRole,
): Promise<Profile> {
  await delay(700)
  const byUsername = profiles.find(
    (p) => p.username.toLowerCase() === username.trim().toLowerCase(),
  )
  const profile = byUsername ?? profiles.find((p) => p.role === role)
  if (!profile) {
    throw new Error('No account found for the selected role.')
  }
  return { ...profile, role }
}

export async function signOut(): Promise<void> {
  await delay(200)
}

// OTP-based authentication for banking kiosk
export async function generateOtp(mobileNumber: string): Promise<{
  success: boolean
  message: string
}> {
  await delay(500)
  const customer = getCustomerByMobileNumber(mobileNumber.replace(/\D/g, ''))
  if (!customer) {
    return {
      success: false,
      message: 'Mobile number not found in database.',
    }
  }
  const otp = mockGenerateOtp()
  return {
    success: true,
    message: `OTP sent to ${mobileNumber}. (Demo: ${otp})`,
  }
}

export async function verifyOtp(
  mobileNumber: string,
  otp: string,
): Promise<{ success: boolean; user?: Profile; account?: Account; error?: string }> {
  await delay(600)
  const customer = getCustomerByMobileNumber(mobileNumber.replace(/\D/g, ''))
  if (!customer) {
    return { success: false, error: 'Mobile number not found.' }
  }

  if (!mockVerifyOtp(otp)) {
    return { success: false, error: 'OTP verification failed. Please try again.' }
  }

  // Get customer's primary account
  const primaryAccount = accounts.find((a) => a.user_id === customer.id)

  return {
    success: true,
    user: customer,
    account: primaryAccount,
  }
}
