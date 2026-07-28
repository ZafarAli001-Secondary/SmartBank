'use client'

import { useState } from 'react'
import { KioskHeader } from '@/components/kiosk/kiosk-header'
import { BottomActionBar } from '@/components/kiosk/bottom-action-bar'
import { VirtualKeyboard } from '@/components/kiosk/virtual-keyboard'
import { ServiceCard } from '@/components/portal/service-card'
import { InfoPanel } from '@/components/portal/info-panel'
import { CustomerInfoCard } from '@/components/portal/customer-info-card'
import { HelpDialog } from '@/components/portal/dialogs/help-dialog'
import { ServiceFormDialog } from '@/components/portal/dialogs/service-form-dialog'
import { TokenDialog } from '@/components/portal/dialogs/token-dialog'
import { KycDialog } from '@/components/portal/dialogs/kyc-dialog'
import { AccountDialog } from '@/components/portal/dialogs/account-dialog'
import { SERVICES, type ServiceDef } from '@/lib/services-config'
import { useAuth } from '@/lib/auth/auth-provider'
import type { ServiceType } from '@/lib/supabase/types'

const FORM_SERVICES: ServiceType[] = [
  'cash_deposit',
  'cash_withdrawal',
  'fund_transfer',
  'cheque_deposit',
]

export function CustomerPortal() {
  const { user, primaryAccount, branch } = useAuth()
  const [active, setActive] = useState<ServiceDef | null>(null)
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const activeType = active?.type ?? null
  const close = () => setActive(null)
  const bumpQueue = () => setRefreshKey((k) => k + 1)

  const openToken = () =>
    setActive(SERVICES.find((s) => s.type === 'queue_token') ?? null)

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-background">
      <KioskHeader />

      <main className="flex min-h-0 flex-1 gap-5 p-5 overflow-hidden">
        {/* Service grid */}
        <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Customer Info Card */}
          {user && <CustomerInfoCard user={user} account={primaryAccount} branch={branch} />}

          <div className="grid flex-1 grid-cols-2 grid-cols-3 gap-5 auto-rows-fr min-h-0">
            {SERVICES.filter((s) => s.type !== 'queue_token').map((service) => (
              <ServiceCard
                key={service.type}
                service={service}
                onSelect={setActive}
              />
            ))}
          </div>
        </section>

        {/* Right info panel */}
        <div className="hidden w-[320px] shrink-0 md:block">
          <InfoPanel onGenerateToken={openToken} refreshKey={refreshKey} />
        </div>
      </main>

      <BottomActionBar
        onHome={close}
        onToggleKeyboard={() => setKeyboardOpen((v) => !v)}
        onHelp={() => setHelpOpen(true)}
      />

      {keyboardOpen && <VirtualKeyboard onClose={() => setKeyboardOpen(false)} />}

      {/* Service dialogs */}
      {active && FORM_SERVICES.includes(active.type) && (
        <ServiceFormDialog
          service={active}
          open
          onClose={close}
          onCompleted={bumpQueue}
        />
      )}
      <TokenDialog
        open={activeType === 'queue_token'}
        onClose={close}
        onCompleted={bumpQueue}
      />
      <KycDialog open={activeType === 'digital_kyc'} onClose={close} />
      <AccountDialog open={activeType === 'account_balance'} onClose={close} />

      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </div>
  )
}
