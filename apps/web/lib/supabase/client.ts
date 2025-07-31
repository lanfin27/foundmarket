import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // 환경 변수가 없으면 더미 클라이언트 반환
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Supabase environment variables missing in client.ts')
    console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20) + '...')
    // 더미 클라이언트 반환 (실제로는 사용되지 않음)
    return createBrowserClient('https://dummy.supabase.co', 'dummy-key')
  }

  console.log('✅ Creating Supabase client with:', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20) + '...'
  })
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}