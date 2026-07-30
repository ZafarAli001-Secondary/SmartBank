import { ArrowRight } from 'lucide-react'
import type { Service } from './services-data'

export function ServiceCard({ title, description, Icon, iconColor, iconBg }: Service) {
  return (
    <button
      type="button"
      className="group flex h-full w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-gray-100 transition hover:shadow-md hover:ring-[#ea5a12]/30"
    >
      <span
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="h-8 w-8" style={{ color: iconColor }} />
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-[16px] font-bold leading-snug text-gray-900 text-balance">{title}</h3>
        <p className="mt-1 text-[12px] leading-snug text-gray-500 text-pretty">{description}</p>
      </div>

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ea5a12]/40 text-[#ea5a12] transition group-hover:bg-[#ea5a12] group-hover:text-white">
        <ArrowRight className="h-5 w-5" />
      </span>
    </button>
  )
}
