'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  signIn as apiSignIn,
  signOut as apiSignOut,
  generateOtp as apiGenerateOtp,
  verifyOtp as apiVerifyOtp,
} from '@/services/auth-service'
import type { Profile, UserRole, Account, Branch } from '@/lib/supabase/types'
import { branchConfig } from '@/lib/mock/db'

const STORAGE_KEY = 'smartbank.session'

interface AuthContextValue {
  user: Profile | null
  primaryAccount: Account | null
  branch: Branch | null
  loading: boolean
  signIn: (username: string, password: string, role: UserRole) => Promise<Profile>
  signOut: () => Promise<void>
  generateOtp: (mobileNumber: string) => Promise<{ success: boolean; message: string }>
  verifyOtp: (
    mobileNumber: string,
    otp: string,
  ) => Promise<{ success: boolean; user?: Profile; account?: Account; error?: string }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface SessionData {
  user: Profile
  account?: Account
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [primaryAccount, setPrimaryAccount] = useState<Account | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const session = JSON.parse(raw) as SessionData
        setUser(session.user)
        if (session.account) setPrimaryAccount(session.account)
      }
    } catch {
      // ignore malformed session
    }
    setLoading(false)
  }, [])

  const signIn = useCallback(
    async (username: string, password: string, role: UserRole) => {
      const profile = await apiSignIn(username, password, role)
      setUser(profile)
      const sessionData: SessionData = { user: profile }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData))
      return profile
    },
    [],
  )

  const signOut = useCallback(async () => {
    await apiSignOut()
    setUser(null)
    setPrimaryAccount(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  const generateOtp = useCallback(
    async (mobileNumber: string) => {
      return apiGenerateOtp(mobileNumber)
    },
    [],
  )

  const verifyOtp = useCallback(
    async (mobileNumber: string, otp: string) => {
      const result = await apiVerifyOtp(mobileNumber, otp)
      if (result.success && result.user && result.account) {
        setUser(result.user)
        setPrimaryAccount(result.account)
        const sessionData: SessionData = {
          user: result.user,
          account: result.account,
        }
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData))
      }
      return result
    },
    [],
  )

  const value = useMemo(
    () => ({
      user,
      primaryAccount,
      branch: branchConfig,
      loading,
      signIn,
      signOut,
      generateOtp,
      verifyOtp,
    }),
    [user, primaryAccount, loading, signIn, signOut, generateOtp, verifyOtp],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
