'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { serviceRequests } from '@/lib/mock/db'
import { Search, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

type FilterStatus = 'all' | 'pending' | 'approved' | 'completed'

export default function CustomerRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [requests, setRequests] = useState(serviceRequests)

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesSearch =
        req.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.reference.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || req.status === filterStatus

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, filterStatus, requests])

  const handleApprove = (requestId: string) => {
    setRequests(
      requests.map((r) => (r.id === requestId ? { ...r, status: 'approved' as const } : r))
    )
  }

  const handleComplete = (requestId: string) => {
    setRequests(
      requests.map((r) => (r.id === requestId ? { ...r, status: 'completed' as const } : r))
    )
  }

  const stats = {
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    completed: requests.filter((r) => r.status === 'completed').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Requests</h1>
        <p className="text-muted-foreground">Review and process service requests from customers</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 space-y-2">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
        </Card>
        <Card className="p-4 space-y-2 border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-3xl font-bold text-blue-600">{stats.approved}</p>
        </Card>
        <Card className="p-4 space-y-2 border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-950/20">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer name or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending', 'approved', 'completed'] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Requests List */}
      <Card className="p-6 space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="size-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No requests found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedRequest === req.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedRequest(selectedRequest === req.id ? null : req.id)}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">{req.customer_name}</p>
                      <p className="text-sm text-muted-foreground">{req.reference}</p>
                    </div>
                  </div>
                  <Badge
                    className={`text-xs ${
                      req.status === 'pending'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400'
                        : req.status === 'approved'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
                    }`}
                  >
                    {req.status}
                  </Badge>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Service Type</p>
                    <p className="text-sm font-medium capitalize">{req.service_type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="text-sm font-medium">₹{req.amount.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Expand Details */}
                {selectedRequest === req.id && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">DETAILS</p>
                      <div className="bg-accent/50 p-3 rounded text-sm space-y-1">
                        {Object.entries(req.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                            <span className="font-medium text-foreground">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    {req.status === 'pending' && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleApprove(req.id)}
                          className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <CheckCircle2 className="size-4" />
                          Approve
                        </Button>
                      </div>
                    )}

                    {req.status === 'approved' && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleComplete(req.id)}
                          className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <CheckCircle2 className="size-4" />
                          Mark Completed
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
