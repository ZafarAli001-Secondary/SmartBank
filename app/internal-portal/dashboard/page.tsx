'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { queueTokens, serviceRequests } from '@/lib/mock/db'
import { Clock, Users, FileText, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react'

export default function DashboardPage() {
  const stats = useMemo(() => {
    return {
      totalRequests: serviceRequests.length,
      pendingRequests: serviceRequests.filter((r) => r.status === 'pending').length,
      waitingCustomers: queueTokens.filter((q) => q.status === 'waiting').length,
      servingNow: queueTokens.filter((q) => q.status === 'serving').length,
    }
  }, [])

  const recentRequests = useMemo(() => {
    return serviceRequests
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to SmartBank Internal Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 space-y-4 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Requests</span>
            <FileText className="size-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">{stats.totalRequests}</p>
            <p className="text-xs text-muted-foreground">All service requests</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4 border border-orange-200 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-950/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Pending</span>
            <AlertCircle className="size-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-orange-700 dark:text-orange-400">{stats.pendingRequests}</p>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4 border border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">In Queue</span>
            <Users className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{stats.waitingCustomers}</p>
            <p className="text-xs text-muted-foreground">Customers waiting</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4 border border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-950/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Now Serving</span>
            <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-green-700 dark:text-green-400">{stats.servingNow}</p>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 space-y-4 border border-border">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Link href="/internal-portal/queue">
            <Button variant="outline" className="w-full h-24 flex-col gap-2">
              <Clock className="size-5" />
              <span className="text-xs">Queue Mgmt</span>
            </Button>
          </Link>
          <Link href="/internal-portal/requests">
            <Button variant="outline" className="w-full h-24 flex-col gap-2">
              <FileText className="size-5" />
              <span className="text-xs">Requests</span>
            </Button>
          </Link>
          <Link href="/internal-portal/search">
            <Button variant="outline" className="w-full h-24 flex-col gap-2">
              <Users className="size-5" />
              <span className="text-xs">Customers</span>
            </Button>
          </Link>
          <Link href="/internal-portal/transactions">
            <Button variant="outline" className="w-full h-24 flex-col gap-2">
              <TrendingUp className="size-5" />
              <span className="text-xs">Transactions</span>
            </Button>
          </Link>
          <Link href="/internal-portal/kyc">
            <Button variant="outline" className="w-full h-24 flex-col gap-2">
              <AlertCircle className="size-5" />
              <span className="text-xs">KYC Verify</span>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Requests */}
      <Card className="p-6 space-y-4 border border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Requests</h2>
          <Link href="/internal-portal/requests">
            <Button variant="link" size="sm">View All</Button>
          </Link>
        </div>

        <div className="space-y-3">
          {recentRequests.map((req) => (
            <div key={req.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{req.customer_name}</p>
                  <Badge variant="outline" className="text-xs">
                    {req.reference}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground capitalize">
                  {req.service_type.replace('_', ' ')} - ₹{req.amount.toLocaleString('en-IN')}
                </p>
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
          ))}
        </div>
      </Card>
    </div>
  )
}
