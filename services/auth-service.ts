import { delay, profiles } from '@/lib/mock/db'
import type { Profile, UserRole } from '@/lib/supabase/types'

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
