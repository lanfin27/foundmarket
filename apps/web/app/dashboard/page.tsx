import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">대시보드</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">환영합니다!</h2>
          <p className="text-gray-600">로그인된 이메일: {user.email}</p>
          <p className="text-gray-600">사용자 ID: {user.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">내 자산</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-gray-500 text-sm">등록된 자산</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">내 입찰</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-gray-500 text-sm">진행 중인 입찰</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">메시지</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-gray-500 text-sm">읽지 않은 메시지</p>
          </div>
        </div>
      </div>
    </div>
  )
}