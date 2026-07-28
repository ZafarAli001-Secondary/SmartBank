import { accounts, delay, transactions } from '@/lib/mock/db'
import type { Account, Transaction } from '@/lib/supabase/types'

export async function getAccount(userId: string): Promise<Account | null> {
  await delay(500)
  return accounts.find((a) => a.user_id === userId) ?? accounts[0] ?? null
}

export async function getMiniStatement(
  accountId: string,
  limit = 5,
): Promise<Transaction[]> {
  await delay(600)
  return transactions
    .filter((t) => t.account_id === accountId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit)
}
