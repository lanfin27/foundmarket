'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const tabs = [
  { id: 'overview', name: '개요' },
  { id: 'assets', name: '내 자산' },
  { id: 'bids', name: '입찰 내역' },
  { id: 'messages', name: '메시지' },
  { id: 'settings', name: '설정' },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">로딩 중...</div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth')
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            {/* User Info */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                김
              </div>
              <h2 className="text-xl font-semibold">{session.user?.name || '사용자'}</h2>
              <p className="text-gray-600">{session.user?.email}</p>
              <div className="mt-2 inline-flex items-center gap-1 text-sm text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                인증된 판매자
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-center py-4 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-gray-600">등록 자산</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-gray-600">응답률</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-6 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">총 거래액</h3>
                  <p className="text-2xl font-bold text-primary">₩45.2억</p>
                  <p className="text-sm text-gray-500 mt-1">전체 기간</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">활성 자산</h3>
                  <p className="text-2xl font-bold">8개</p>
                  <p className="text-sm text-gray-500 mt-1">현재 판매 중</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">받은 제안</h3>
                  <p className="text-2xl font-bold">24개</p>
                  <p className="text-sm text-gray-500 mt-1">이번 달</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">최근 활동</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">새로운 제안을 받았습니다</p>
                      <p className="text-sm text-gray-600">AI 기반 고객 관리 솔루션에 대한 제안</p>
                      <p className="text-sm text-gray-500 mt-1">2시간 전</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">자산이 검증되었습니다</p>
                      <p className="text-sm text-gray-600">프리미엄 패션 이커머스가 검증 완료</p>
                      <p className="text-sm text-gray-500 mt-1">1일 전</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">내 자산</h2>
                <Link
                  href="/create-asset"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                >
                  새 자산 등록
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Asset Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      활성
                    </span>
                    <div className="text-sm text-gray-500">조회 1,234</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI 기반 고객 관리 솔루션</h3>
                  <p className="text-gray-600 text-sm mb-4">월 매출 5억원, YoY 300% 성장</p>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-primary">₩50억</div>
                    <Link
                      href="/asset/1"
                      className="text-sm text-primary hover:text-primary-hover"
                    >
                      자세히 보기 →
                    </Link>
                  </div>
                </div>

                {/* Add more asset cards */}
              </div>
            </div>
          )}

          {activeTab === 'bids' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">입찰 내역</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">자산명</th>
                        <th className="text-left py-3 px-4">제안 금액</th>
                        <th className="text-left py-3 px-4">상태</th>
                        <th className="text-left py-3 px-4">날짜</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">AI 기반 고객 관리 솔루션</td>
                        <td className="py-3 px-4">₩48억</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                            검토 중
                          </span>
                        </td>
                        <td className="py-3 px-4">2024.01.15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">메시지</h2>
              <div className="text-center py-12 text-gray-500">
                아직 메시지가 없습니다
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">프로필 설정</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">이름</label>
                  <input
                    type="text"
                    defaultValue="김대표"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">회사명</label>
                  <input
                    type="text"
                    defaultValue="테크스타트업"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">소개</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="간단한 소개를 작성해주세요"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                >
                  저장하기
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}