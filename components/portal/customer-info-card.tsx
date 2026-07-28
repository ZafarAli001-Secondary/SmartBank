'use client'

import { CreditCard, Building2, User, Hash } from 'lucide-react'
import type { Profile, Account, Branch } from '@/lib/supabase/types'

interface CustomerInfoCardProps {
  user: Profile
  account: Account | null
  branch: Branch | null
}

export function CustomerInfoCard({ user, account, branch }: CustomerInfoCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Customer Name */}
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <User className="size-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground">Customer Name</p>
            <p className="text-sm font-semibold text-foreground truncate">{user.full_name}</p>
          </div>
        </div>

        {/* Account Number */}
        {account && (
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Hash className="size-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Account Number</p>
              <p className="text-sm font-semibold text-foreground truncate">{account.account_number}</p>
            </div>
          </div>
        )}

        {/* Account Type */}
        {account && (
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <CreditCard className="size-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Account Type</p>
              <p className="text-sm font-semibold text-foreground capitalize">{account.account_type}</p>
            </div>
          </div>
        )}

        {/* Branch Name */}
        {branch && (
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Building2 className="size-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Branch</p>
              <p className="text-sm font-semibold text-foreground truncate">{branch.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
