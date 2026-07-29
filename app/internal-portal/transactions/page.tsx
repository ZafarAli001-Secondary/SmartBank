'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { serviceRequests } from '@/lib/mock/db'
import { CheckCircle2, AlertCircle, DollarSign } from 'lucide-react'

type TransactionType = 'cash_withdrawal' | 'cash_deposit' | 'fund_transfer' | 'cheque_deposit'

export default function TransactionProcessingPage() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationChecks, setVerificationChecks] = useState({
    identity: false,
    documents: false,
    amount: false,
    account: false,
  })

  const transactionRequests = serviceRequests.filter(
    (r) =>
      ['cash_withdrawal', 'cash_deposit', 'fund_transfer', 'cheque_deposit'].includes(
        r.service_type as any
      ) && r.status === 'approved'
  )

  const selectedReq = transactionRequests.find((r) => r.id === selectedRequest)

  const handleProcessTransaction = () => {
    if (Object.values(verificationChecks).every(Boolean)) {
      alert(`Transaction for ${selectedReq?.customer_name} has been processed successfully!`)
      setShowVerificationModal(false)
      setVerificationChecks({ identity: false, documents: false, amount: false, account: false })
      setSelectedRequest(null)
    }
  }

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'cash_withdrawal':
        return '💵'
      case 'cash_deposit':
        return '💰'
      case 'fund_transfer':
        return '🔄'
      case 'cheque_deposit':
        return '📄'
      default:
        return '💳'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transaction Processing</h1>
        <p className="text-muted-foreground">Process and verify approved transactions</p>
      </div>

      {/* Info */}
      <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30">
        <p className="text-sm text-blue-900 dark:text-blue-400">
          Only approved requests are shown here. Verify all details before processing.
        </p>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Transactions List */}
        <div className="col-span-1">
          <Card className="p-4 space-y-3 max-h-screen overflow-y-auto">
            <p className="text-sm font-semibold text-muted-foreground">Pending Processing ({transactionRequests.length})</p>

            {transactionRequests.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="size-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">No pending transactions</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactionRequests.map((req) => (
                  <button
                    key={req.id}
                    onClick={() => setSelectedRequest(req.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedRequest === req.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <p className="text-lg mb-1">{getTransactionTypeIcon(req.service_type)}</p>
                    <p className="font-medium text-sm text-foreground">{req.customer_name}</p>
                    <p className="text-xs text-muted-foreground">₹{req.amount.toLocaleString('en-IN')}</p>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Details */}
        <div className="col-span-2">
          {selectedReq ? (
            <div className="space-y-4">
              {/* Header */}
              <Card className="p-6 border-2 border-primary/30 bg-primary/5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl mb-2">{getTransactionTypeIcon(selectedReq.service_type)}</p>
                      <h2 className="text-2xl font-bold text-foreground">{selectedReq.customer_name}</h2>
                      <p className="text-sm text-muted-foreground">{selectedReq.reference}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="text-3xl font-bold text-green-600">₹{selectedReq.amount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Transaction Details */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Transaction Details</h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Service Type</p>
                      <p className="text-sm font-semibold capitalize text-foreground">
                        {selectedReq.service_type.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Reference</p>
                      <p className="text-sm font-mono font-semibold text-foreground">{selectedReq.reference}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/50 space-y-2 border border-border">
                    {Object.entries(selectedReq.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                        <span className="font-medium text-foreground">{String(value)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground pt-2">
                    Submitted: {new Date(selectedReq.created_at).toLocaleString()}
                  </div>
                </div>
              </Card>

              {/* Verification Checklist */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Pre-Processing Checklist</h3>

                <div className="space-y-3">
                  {[
                    { key: 'identity', label: 'Customer Identity Verified', icon: '🆔' },
                    { key: 'documents', label: 'Required Documents Verified', icon: '📋' },
                    { key: 'amount', label: 'Amount Validation Passed', icon: '✓' },
                    { key: 'account', label: 'Account Details Verified', icon: '🏦' },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={verificationChecks[item.key as keyof typeof verificationChecks]}
                        onChange={(e) =>
                          setVerificationChecks({
                            ...verificationChecks,
                            [item.key]: e.target.checked,
                          })
                        }
                        className="size-4"
                      />
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </label>
                  ))}
                </div>

                <Button
                  onClick={() => setShowVerificationModal(true)}
                  disabled={!Object.values(verificationChecks).every(Boolean)}
                  className="w-full gap-2 mt-4"
                >
                  <CheckCircle2 className="size-4" />
                  Process Transaction
                </Button>
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center space-y-3">
              <DollarSign className="size-12 text-muted-foreground mx-auto opacity-50" />
              <p className="text-muted-foreground">Select a transaction to process</p>
            </Card>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showVerificationModal && selectedReq && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96 p-6 space-y-4">
            <div className="text-center space-y-2">
              <CheckCircle2 className="size-12 text-green-600 mx-auto" />
              <h3 className="text-xl font-bold text-foreground">Confirm Transaction?</h3>
            </div>

            <div className="bg-accent/50 p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-semibold text-foreground">{selectedReq.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold text-foreground">₹{selectedReq.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference:</span>
                <span className="font-mono text-foreground">{selectedReq.reference}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowVerificationModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleProcessTransaction} className="flex-1 gap-2">
                <CheckCircle2 className="size-4" />
                Confirm & Process
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
