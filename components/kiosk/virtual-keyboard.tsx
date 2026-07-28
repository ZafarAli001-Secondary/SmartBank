'use client'

import { Delete, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.', '@'],
]

function insertText(text: string) {
  const el = document.activeElement as HTMLInputElement | HTMLTextAreaElement | null
  if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) return
  const start = el.selectionStart ?? el.value.length
  const end = el.selectionEnd ?? el.value.length
  const setter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(el),
    'value',
  )?.set
  const next =
    text === '\b'
      ? el.value.slice(0, Math.max(0, start - 1)) + el.value.slice(end)
      : el.value.slice(0, start) + text + el.value.slice(end)
  setter?.call(el, next)
  el.dispatchEvent(new Event('input', { bubbles: true }))
  const caret = text === '\b' ? Math.max(0, start - 1) : start + text.length
  el.setSelectionRange(caret, caret)
}

export function VirtualKeyboard({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-4 shadow-2xl backdrop-blur">
      <div className="mx-auto max-w-4xl space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-semibold text-muted-foreground">
            On-screen keyboard
          </span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close keyboard">
            <X className="size-5" />
          </Button>
        </div>
        {ROWS.map((row, i) => (
          <div key={i} className="flex justify-center gap-2">
            {row.map((key) => (
              <button
                key={key}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  insertText(key)
                }}
                className="h-12 min-w-[42px] flex-1 rounded-md border border-border bg-background text-base font-medium text-foreground hover:bg-accent"
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              insertText(' ')
            }}
            className="h-12 flex-[6] rounded-md border border-border bg-background text-base font-medium hover:bg-accent"
          >
            Space
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              insertText('\b')
            }}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md border border-border bg-background text-base font-medium hover:bg-accent"
          >
            <Delete className="size-5" /> Back
          </button>
        </div>
      </div>
    </div>
  )
}
