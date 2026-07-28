'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Landmark } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-provider'
import type { QueueToken } from '@/lib/supabase/types'
import { listQueueTokens } from '@/services/queue-service'

export default function IdlePage() {
  const router = useRouter()
  const { user, branch } = useAuth()
  const [currentToken, setCurrentToken] = useState<QueueToken | null>(null)
  const [idleTime, setIdleTime] = useState(0)

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    // Load current token
    async function loadToken() {
      const tokens = await listQueueTokens()
      const userTokens = tokens.filter((t) => t.user_id === user.id || t.customer_name === user.full_name)
      if (userTokens.length > 0) {
        setCurrentToken(userTokens[userTokens.length - 1])
      }
    }

    loadToken()

    // Redirect to portal after 2 minutes of inactivity or if idle for too long
    const timeout = setTimeout(() => {
      router.push('/portal')
    }, 120000) // 2 minutes

    // Track idle time
    const interval = setInterval(() => {
      setIdleTime((prev) => prev + 1)
    }, 1000)

    const handleActivity = () => {
      clearTimeout(timeout)
      router.push('/portal')
    }

    window.addEventListener('click', handleActivity)
    window.addEventListener('keydown', handleActivity)
    window.addEventListener('touch', handleActivity)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
      window.removeEventListener('click', handleActivity)
      window.removeEventListener('keydown', handleActivity)
      window.removeEventListener('touch', handleActivity)
    }
  }, [user, router])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-12 text-center">
        {/* Bank Logo */}
        <div className="flex flex-col items-center gap-6">
          <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
            <Landmark className="size-16 stroke-1" />
          </div>
          
          {/* Bank Name */}
          <div>
            <h1 className="text-4xl font-bold text-foreground">SmartBank</h1>
            <p className="mt-1 text-sm text-muted-foreground">Digital Branch Kiosk</p>
          </div>

          {/* Branch Name */}
          <div className="text-lg text-muted-foreground">
            {branch?.name || 'MG Road, Bengaluru'}
          </div>
        </div>

        {/* Current Token Display */}
        {currentToken && (
          <div className="rounded-2xl border-2 border-primary bg-primary/10 p-8">
            <div className="mb-4 text-sm font-medium text-muted-foreground">
              Current Token Number
            </div>
            <div className="font-mono text-5xl font-bold tracking-widest text-primary">
              {currentToken.token_number}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Service: <span className="font-semibold text-foreground">{currentToken.service_type}</span>
            </div>
          </div>
        )}

        {/* Idle Message */}
        <p className="max-w-md text-sm text-muted-foreground">
          This kiosk will return to the main screen in {120 - idleTime} seconds.
          <br />
          Touch or click anywhere to continue.
        </p>
      </div>
    </div>
  )
}
