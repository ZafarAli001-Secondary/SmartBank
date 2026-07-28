'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { signIn as apiSignIn, signOut as apiSignOut } from '@/services/auth-service'
import type { Profile, UserRole } from '@/lib/supabase/types'

const STORAGE_KEY = 'smartbank.session'

interface AuthContextValue {
  user: Profile | null
  loading: boolean
  signIn: (username: string, password: string, role: UserRole) => Promise<Profile>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw) as Profile)
    } catch {
      // ignore malformed session
    }
    setLoading(false)
  }, [])

  const signIn = useCallback(
    async (username: string, password: string, role: UserRole) => {
      const profile = await apiSignIn(username, password, role)
      setUser(profile)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
      return profile
    },
    [],
  )

  const signOut = useCallback(async () => {
    await apiSignOut()
    setUser(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
