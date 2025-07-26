'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Asset } from '@/types'

// Mock data
const mockAssets: Asset[] = [
  {
    id: '1',
    sellerId: 'seller1',
    type: 'SAAS',
    category: 'SaaS',
    title: 'AI 기반 고객 관리 솔루션',
    summary: '월 매출 5억원, YoY 300% 성장 중인 B2B SaaS',
    description: '',
    status: 'ACTIVE',
    askingPrice: 5000000000,
    region: '서울',
    industry: '소프트웨어',
    viewCount: 1234,
    trustScore: 95,
    createdAt: new Date(),
    updatedAt: new Date(),
    financials: {
      id: '1',
      assetId: '1',
      monthlyRevenue: 500000000,
      monthlyProfit: 150000000,
      yearlyRevenue: 6000000000,
      yearlyProfit: 1800000000,
      growthRate: 300,
    }
  },
  // Add more mock data as needed
]

export default function SearchPage() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [priceRange, setPriceRange] = useState<string>('')
  const [revenueRange, setRevenueRange] = useState<string>('')
  const [region, setRegion] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('latest')

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">필터</h2>
            
            {/* Asset Type */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">자산 유형</h3>
              <div className="space-y-2">
                {['SAAS', 'ECOMMERCE', 'APP', 'OTHER'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedType === type}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">
                      {type === 'SAAS' && 'SaaS'}
                      {type === 'ECOMMERCE' && '이커머스'}
                      {type === 'APP' && '모바일 앱'}
                      {type === 'OTHER' && '기타'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">희망 가격</h3>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">전체</option>
                <option value="0-1">1억원 이하</option>
                <option value="1-5">1억 - 5억원</option>
                <option value="5-10">5억 - 10억원</option>
                <option value="10-50">10억 - 50억원</option>
                <option value="50+">50억원 이상</option>
              </select>
            </div>

            {/* Revenue Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">월 매출</h3>
              <select
                value={revenueRange}
                onChange={(e) => setRevenueRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">전체</option>
                <option value="0-0.1">1천만원 이하</option>
                <option value="0.1-0.5">1천만 - 5천만원</option>
                <option value="0.5-1">5천만 - 1억원</option>
                <option value="1-5">1억 - 5억원</option>
                <option value="5+">5억원 이상</option>
              </select>
            </div>

            {/* Region */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">지역</h3>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">전체</option>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="인천">인천</option>
                <option value="부산">부산</option>
                <option value="대구">대구</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition">
              필터 초기화
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="키워드로 검색 (예: SaaS, 이커머스, 패션)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition">
                검색
              </button>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              총 <span className="font-semibold text-gray-900">892</span>개의 자산
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="latest">최신순</option>
              <option value="price-low">가격 낮은순</option>
              <option value="price-high">가격 높은순</option>
              <option value="revenue">매출 높은순</option>
              <option value="trust">신뢰도순</option>
            </select>
          </div>

          {/* Asset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAssets.map((asset) => (
              <Link
                key={asset.id}
                href={`/asset/${asset.id}`}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {asset.category}
                    </span>
                    {asset.trustScore >= 90 && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        검증됨
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    조회 {asset.viewCount.toLocaleString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{asset.title}</h3>
                <p className="text-gray-600 mb-4">{asset.summary}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">희망 가격</div>
                    <div className="text-lg font-bold text-primary">
                      ₩{(asset.askingPrice / 100000000).toFixed(1)}억
                    </div>
                  </div>
                  {asset.financials && (
                    <div>
                      <div className="text-sm text-gray-500">월 매출</div>
                      <div className="text-lg font-semibold">
                        ₩{(asset.financials.monthlyRevenue / 100000000).toFixed(1)}억
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {asset.region && <span>{asset.region}</span>}
                    {asset.industry && <span>{asset.industry}</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium">{asset.trustScore}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex gap-2">
              <button className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded">
                이전
              </button>
              <button className="px-3 py-2 bg-primary text-white rounded">1</button>
              <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">2</button>
              <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">3</button>
              <span className="px-3 py-2">...</span>
              <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">10</button>
              <button className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                다음
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}