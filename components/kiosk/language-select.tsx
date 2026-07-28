'use client'

import { Globe } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LANGUAGES } from '@/lib/services-config'

export function LanguageSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v ?? value)}>
      <SelectTrigger className="h-12 min-w-[130px] gap-2" aria-label="Select language">
        <Globe className="size-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code} className="h-11 text-base">
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
