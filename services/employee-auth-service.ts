import { delay, employees } from '@/lib/mock/db'
import type { Employee } from '@/lib/supabase/types'

export async function employeeSignIn(
  employeeId: string,
  password: string,
): Promise<Employee> {
  await delay(700)
  
  const employee = employees.find(
    (e) =>
      (e.username.toLowerCase() === employeeId.trim().toLowerCase() ||
        e.employee_id.toLowerCase() === employeeId.trim().toLowerCase()) &&
      e.is_active,
  )

  if (!employee) {
    throw new Error('Employee not found or inactive.')
  }

  // In production, validate password properly. For demo, any password works.
  if (!password) {
    throw new Error('Password is required.')
  }

  return employee
}

export async function employeeSignOut(): Promise<void> {
  await delay(200)
}

export async function getEmployeeById(employeeId: string): Promise<Employee | null> {
  await delay(300)
  return employees.find((e) => e.id === employeeId && e.is_active) ?? null
}
