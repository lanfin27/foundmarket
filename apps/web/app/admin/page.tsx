'use client'

import { useState } from 'react'

const tabs = [
  { id: 'verification', name: '자산 검증' },
  { id: 'transactions', name: '거래 관리' },
  { id: 'users', name: '사용자 관리' },
  { id: 'reports', name: '신고 관리' },
  { id: 'analytics', name: '통계' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('verification')

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">대기 중인 검증 요청</h2>
              
              <div className="space-y-4">
                {/* Verification Item */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">AI 기반 고객 관리 솔루션</h3>
                      <p className="text-sm text-gray-600">판매자: 김대표 | 희망가: ₩50억</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      검토 대기
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">월 매출</p>
                      <p className="font-semibold">₩5억</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">성장률</p>
                      <p className="font-semibold">+300%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">제출 문서</p>
                      <p className="font-semibold">5개</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      승인
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                      거절
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                      상세 검토
                    </button>
                  </div>
                </div>

                {/* Add more verification items */}
              </div>
            </div>

            {/* Expert Review Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">전문가 검토 의견</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">회계사 의견</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="재무제표 검토 의견을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">변호사 의견</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="법적 검토 의견을 입력하세요"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                >
                  의견 저장
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">진행 중인 거래</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">거래 ID</th>
                      <th className="text-left py-3 px-4">자산명</th>
                      <th className="text-left py-3 px-4">판매자</th>
                      <th className="text-left py-3 px-4">구매자</th>
                      <th className="text-left py-3 px-4">거래액</th>
                      <th className="text-left py-3 px-4">상태</th>
                      <th className="text-left py-3 px-4">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">#TX001</td>
                      <td className="py-3 px-4">AI 기반 고객 관리 솔루션</td>
                      <td className="py-3 px-4">김대표</td>
                      <td className="py-3 px-4">이투자</td>
                      <td className="py-3 px-4">₩48억</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          에스크로 입금
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:text-primary-hover text-sm">
                          상세보기
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">사용자 관리</h2>
            <div className="text-center py-12 text-gray-500">
              사용자 관리 기능 준비 중
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">신고 관리</h2>
            <div className="text-center py-12 text-gray-500">
              신고 내역이 없습니다
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">총 거래액</h3>
                <p className="text-2xl font-bold text-primary">₩125억</p>
                <p className="text-sm text-green-600 mt-1">+23% 전월 대비</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">활성 사용자</h3>
                <p className="text-2xl font-bold">15,234</p>
                <p className="text-sm text-green-600 mt-1">+12% 전월 대비</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">등록 자산</h3>
                <p className="text-2xl font-bold">892</p>
                <p className="text-sm text-green-600 mt-1">+45 이번 주</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">거래 성공률</h3>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-gray-500 mt-1">지난 30일</p>
              </div>
            </div>

            {/* Chart placeholder */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">월별 거래액 추이</h3>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                차트 영역
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}