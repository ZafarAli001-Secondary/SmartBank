// Supabase browser client.
//
// This project ships with an in-memory mock data layer (see `lib/mock/db.ts`)
// so the kiosk runs fully in preview without a backend. When you are ready to
// connect a real Supabase project:
//
//   1. `pnpm add @supabase/supabase-js`
//   2. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
//   3. Uncomment the createBrowserClient implementation below
//   4. Point the functions in `services/` at Supabase queries instead of the mock
//
// The services are written against the same types (see `lib/supabase/types.ts`)
// so swapping the data source does not require UI changes.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

// let browserClient: ReturnType<typeof createBrowserClient> | null = null
//
// export function getSupabaseBrowserClient() {
//   if (!isSupabaseConfigured) return null
//   if (!browserClient) {
//     browserClient = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
//   }
//   return browserClient
// }
