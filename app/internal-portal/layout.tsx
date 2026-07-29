'use client'

import { EmployeeRouteGuard } from '@/components/auth/employee-route-guard'
import { InternalPortalSidebar } from '@/components/internal-portal/internal-portal-sidebar'
import { InternalPortalHeader } from '@/components/internal-portal/internal-portal-header'

export default function InternalPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EmployeeRouteGuard role="staff">
      <div className="flex h-screen w-full bg-background">
        <InternalPortalSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <InternalPortalHeader />
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </EmployeeRouteGuard>
  )
}
