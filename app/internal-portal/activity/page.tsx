'use client'

import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'

interface ActivityLog {
  id: string
  action: string
  description: string
  employee: string
  timestamp: string
  category: 'transaction' | 'kyc' | 'queue' | 'system'
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: 'a1',
    action: 'Transaction Processed',
    description: 'Approved and completed cash deposit of ₹60,000 for Vikram Singh',
    employee: 'Priya Nair (EMP-001)',
    timestamp: '2026-07-28 08:45:00',
    category: 'transaction',
  },
  {
    id: 'a2',
    action: 'KYC Verified',
    description: 'Verified PAN document for Aarav Sharma',
    employee: 'Anjali Sharma (EMP-003)',
    timestamp: '2026-07-28 08:42:00',
    category: 'kyc',
  },
  {
    id: 'a3',
    action: 'Queue Token Called',
    description: 'Called A-104 (Vikram Singh) for cash deposit service',
    employee: 'Priya Nair (EMP-001)',
    timestamp: '2026-07-28 08:30:00',
    category: 'queue',
  },
  {
    id: 'a4',
    action: 'Request Approved',
    description: 'Approved fund transfer request of ₹25,000 from Neha Gupta',
    employee: 'Priya Nair (EMP-001)',
    timestamp: '2026-07-28 08:25:00',
    category: 'transaction',
  },
  {
    id: 'a5',
    action: 'Login',
    description: 'Employee logged into Internal Portal',
    employee: 'Priya Nair (EMP-001)',
    timestamp: '2026-07-28 08:00:00',
    category: 'system',
  },
  {
    id: 'a6',
    action: 'KYC Verification Started',
    description: 'Initiated KYC verification process for Neha Gupta',
    employee: 'Anjali Sharma (EMP-003)',
    timestamp: '2026-07-28 07:58:00',
    category: 'kyc',
  },
  {
    id: 'a7',
    action: 'Queue Token Issued',
    description: 'Issued token A-105 for cheque deposit service',
    employee: 'System',
    timestamp: '2026-07-28 08:34:00',
    category: 'queue',
  },
]

export default function ActivityLogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<'all' | ActivityLog['category']>('all')

  const filteredLogs = useMemo(() => {
    return mockActivityLogs.filter((log) => {
      const matchesSearch =
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.employee.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = filterCategory === 'all' || log.category === filterCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, filterCategory])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transaction':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400'
      case 'kyc':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400'
      case 'queue':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400'
      case 'system':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Activity Log</h1>
        <p className="text-muted-foreground">Audit trail of all staff actions and system events</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by action, employee, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'transaction', 'kyc', 'queue', 'system'] as const).map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory(category)}
                className="capitalize"
              >
                {category === 'all' ? 'All Activities' : category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Activity Timeline */}
      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <Card className="p-12 text-center space-y-3">
            <Filter className="size-12 text-muted-foreground mx-auto opacity-50" />
            <p className="text-muted-foreground">No activities found matching your search</p>
          </Card>
        ) : (
          filteredLogs.map((log, idx) => (
            <Card
              key={log.id}
              className="p-4 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex gap-4">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center pt-1">
                  <div className="size-3 rounded-full bg-primary mt-2"></div>
                  {idx < filteredLogs.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-1"></div>
                  )}
                </div>

                {/* Activity Details */}
                <div className="flex-1 pb-2">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{log.action}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{log.description}</p>
                    </div>
                    <Badge className={`shrink-0 ${getCategoryColor(log.category)} capitalize`}>
                      {log.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border mt-2">
                    <span>{log.employee}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
