'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { queueTokens, nextTokenNumber } from '@/lib/mock/db'
import { Phone, CheckCircle2, Clock, Trash2, Plus } from 'lucide-react'

export default function QueueManagementPage() {
  const [tokens, setTokens] = useState(queueTokens)
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  const waitingTokens = tokens.filter((t) => t.status === 'waiting')
  const servingTokens = tokens.filter((t) => t.status === 'serving')
  const completedTokens = tokens.filter((t) => t.status === 'completed')

  const handleCallNext = () => {
    const nextWaiting = waitingTokens[0]
    if (nextWaiting) {
      setTokens(
        tokens.map((t) =>
          t.id === nextWaiting.id ? { ...t, status: 'serving' as const, counter: 1 } : t
        )
      )
      setSelectedToken(nextWaiting.id)
    }
  }

  const handleCompleteService = (tokenId: string) => {
    setTokens(
      tokens.map((t) =>
        t.id === tokenId ? { ...t, status: 'completed' as const } : t
      )
    )
    setSelectedToken(null)
  }

  const handleAddToken = () => {
    const newToken = {
      id: `q_new_${Date.now()}`,
      token_number: nextTokenNumber(),
      user_id: `u_${Date.now()}`,
      customer_name: 'Walk-in Customer',
      service_type: 'general_inquiry' as const,
      status: 'waiting' as const,
      counter: null,
      created_at: new Date().toISOString(),
    }
    setTokens([...tokens, newToken])
  }

  const handleRemoveToken = (tokenId: string) => {
    setTokens(tokens.filter((t) => t.id !== tokenId))
    if (selectedToken === tokenId) setSelectedToken(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Queue Management</h1>
          <p className="text-muted-foreground">Manage customer queue and service flow</p>
        </div>
        <Button onClick={handleAddToken} className="gap-2">
          <Plus className="size-4" />
          Add Manual Token
        </Button>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 space-y-2">
          <p className="text-sm text-muted-foreground">Waiting</p>
          <p className="text-3xl font-bold text-blue-600">{waitingTokens.length}</p>
        </Card>
        <Card className="p-4 space-y-2 border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-950/20">
          <p className="text-sm text-muted-foreground">Serving Now</p>
          <p className="text-3xl font-bold text-green-600">{servingTokens.length}</p>
        </Card>
        <Card className="p-4 space-y-2 border-purple-200 bg-purple-50/50 dark:border-purple-900/30 dark:bg-purple-950/20">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-3xl font-bold text-purple-600">{completedTokens.length}</p>
        </Card>
      </div>

      {/* Serving Now */}
      {servingTokens.length > 0 && (
        <Card className="p-6 space-y-4 border-2 border-green-300 bg-green-50/30 dark:border-green-900/50 dark:bg-green-950/20">
          <h2 className="text-lg font-semibold text-foreground">Now Serving</h2>
          <div className="space-y-3">
            {servingTokens.map((token) => (
              <div key={token.id} className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-slate-900 border border-border">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-4xl font-bold text-green-600 w-20 text-center">{token.token_number}</div>
                  <div className="space-y-1 flex-1">
                    <p className="font-semibold text-foreground">{token.customer_name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{token.service_type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCompleteService(token.id)}
                    className="gap-2"
                    size="sm"
                  >
                    <CheckCircle2 className="size-4" />
                    Complete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveToken(token.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Waiting Queue */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Waiting Queue</h2>
          {waitingTokens.length > 0 && (
            <Button onClick={handleCallNext} className="gap-2" size="sm">
              <Phone className="size-4" />
              Call Next
            </Button>
          )}
        </div>

        {waitingTokens.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="size-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No customers waiting</p>
          </div>
        ) : (
          <div className="space-y-2">
            {waitingTokens.map((token, idx) => (
              <div key={token.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <Badge className="text-lg font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400">
                    #{idx + 1}
                  </Badge>
                  <div className="space-y-1 flex-1">
                    <p className="font-medium text-foreground">{token.token_number}</p>
                    <p className="text-sm text-muted-foreground">{token.customer_name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">{token.service_type.replace('_', ' ')}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveToken(token.id)}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Completed Today */}
      {completedTokens.length > 0 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Completed Today</h2>
          <div className="space-y-2">
            {completedTokens.map((token) => (
              <div key={token.id} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <CheckCircle2 className="size-5 text-green-600 shrink-0" />
                <span className="text-sm text-muted-foreground">{token.token_number} - {token.customer_name}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
