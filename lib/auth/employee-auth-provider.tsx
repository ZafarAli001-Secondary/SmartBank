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
  employeeSignIn as apiEmployeeSignIn,
  employeeSignOut as apiEmployeeSignOut,
  getEmployeeById as apiGetEmployeeById,
} from '@/services/employee-auth-service'
import type { Employee, EmployeeRole } from '@/lib/supabase/types'

const EMPLOYEE_STORAGE_KEY = 'smartbank.employee-session'

interface EmployeeAuthContextValue {
  employee: Employee | null
  loading: boolean
  signIn: (employeeId: string, password: string) => Promise<Employee>
  signOut: () => Promise<void>
  isAdmin: () => boolean
  isStaff: () => boolean
}

const EmployeeAuthContext = createContext<EmployeeAuthContextValue | undefined>(undefined)

export function EmployeeAuthProvider({ children }: { children: React.ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(EMPLOYEE_STORAGE_KEY)
      if (raw) {
        const session = JSON.parse(raw) as Employee
        setEmployee(session)
      }
    } catch {
      // ignore malformed session
    }
    setLoading(false)
  }, [])

  const signIn = useCallback(async (employeeId: string, password: string) => {
    const emp = await apiEmployeeSignIn(employeeId, password)
    setEmployee(emp)
    sessionStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(emp))
    return emp
  }, [])

  const signOut = useCallback(async () => {
    await apiEmployeeSignOut()
    setEmployee(null)
    sessionStorage.removeItem(EMPLOYEE_STORAGE_KEY)
  }, [])

  const isAdmin = useCallback(() => {
    return employee?.role === 'admin'
  }, [employee])

  const isStaff = useCallback(() => {
    return employee?.role === 'staff'
  }, [employee])

  const value = useMemo(
    () => ({
      employee,
      loading,
      signIn,
      signOut,
      isAdmin,
      isStaff,
    }),
    [employee, loading, signIn, signOut, isAdmin, isStaff],
  )

  return (
    <EmployeeAuthContext.Provider value={value}>{children}</EmployeeAuthContext.Provider>
  )
}

export function useEmployeeAuth() {
  const ctx = useContext(EmployeeAuthContext)
  if (!ctx) throw new Error('useEmployeeAuth must be used within an EmployeeAuthProvider')
  return ctx
}
