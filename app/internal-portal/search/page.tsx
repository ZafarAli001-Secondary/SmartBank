'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { profiles, accounts, transactions } from '@/lib/mock/db'
import { Search, Mail, Phone, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'

export default function CustomerSearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  const searchResults = profiles
    .filter((p) => p.role === 'customer')
    .filter((p) =>
      p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone?.includes(searchTerm) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const selectedProfile = profiles.find((p) => p.id === selectedCustomer)
  const customerAccount = selectedProfile ? accounts.find((a) => a.user_id === selectedProfile.id) : null
  const customerTransactions = customerAccount ? transactions.filter((t) => t.account_id === customerAccount.id) : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Search</h1>
        <p className="text-muted-foreground">Find and view customer profiles and accounts</p>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Search Results */}
        <div className="col-span-1">
          <Card className="p-4 space-y-3 max-h-96 overflow-y-auto">
            <p className="text-sm font-semibold text-muted-foreground">Results ({searchResults.length})</p>

            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <Search className="size-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">No customers found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {searchResults.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedCustomer === customer.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <p className="font-medium text-sm text-foreground">{customer.full_name}</p>
                    <p className="text-xs text-muted-foreground">{customer.phone}</p>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Customer Details */}
        <div className="col-span-2 space-y-4">
          {selectedProfile ? (
            <>
              {/* Profile Card */}
              <Card className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">{selectedProfile.full_name}</h2>
                    <Badge className="w-fit capitalize">{selectedProfile.kyc_status} KYC</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail className="size-3" /> Email
                    </p>
                    <p className="text-sm font-medium text-foreground">{selectedProfile.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="size-3" /> Phone
                    </p>
                    <p className="text-sm font-medium text-foreground">{selectedProfile.phone}</p>
                  </div>
                </div>
              </Card>

              {/* Account Details */}
              {customerAccount && (
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <DollarSign className="size-4" />
                    Account Details
                  </h3>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Account Number</p>
                        <p className="text-sm font-semibold text-foreground font-mono">{customerAccount.account_number}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="text-sm font-semibold text-foreground capitalize">{customerAccount.account_type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">IFSC Code</p>
                        <p className="text-sm font-semibold text-foreground font-mono">{customerAccount.ifsc}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Branch</p>
                        <p className="text-sm font-semibold text-foreground">{customerAccount.branch}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-xs text-muted-foreground">Current Balance</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        ₹{customerAccount.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Recent Transactions */}
              {customerTransactions.length > 0 && (
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">Recent Transactions</h3>

                  <div className="space-y-2">
                    {customerTransactions.slice(0, 10).map((txn) => (
                      <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50">
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`p-2 rounded-lg ${
                              txn.type === 'credit'
                                ? 'bg-green-100 dark:bg-green-950'
                                : 'bg-red-100 dark:bg-red-950'
                            }`}
                          >
                            {txn.type === 'credit' ? (
                              <TrendingUp className={`size-4 text-green-600 dark:text-green-400`} />
                            ) : (
                              <TrendingDown className={`size-4 text-red-600 dark:text-red-400`} />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{txn.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(txn.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-semibold ${
                              txn.type === 'credit'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Bal: ₹{txn.balance_after.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {customerTransactions.length > 10 && (
                    <Button variant="outline" size="sm" className="w-full">
                      View All Transactions
                    </Button>
                  )}
                </Card>
              )}
            </>
          ) : (
            <Card className="p-12 text-center space-y-3">
              <Search className="size-12 text-muted-foreground mx-auto opacity-50" />
              <p className="text-muted-foreground">Search for a customer to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
