import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Asset } from '@/types'

// Mock data - replace with API call
async function getAsset(id: string): Promise<Asset | null> {
  // This would be an API call in production
  const mockAsset: Asset = {
    id: '1',
    sellerId: 'seller1',
    type: 'SAAS',
    category: 'SaaS',
    title: 'AI 기반 고객 관리 솔루션',
    summary: '월 매출 5억원, YoY 300% 성장 중인 B2B SaaS',
    description: `국내 최고의 AI 기반 고객 관리 솔루션입니다. 
    
    주요 특징:
    - 자동 고객 세분화 및 타겟팅
    - 실시간 고객 행동 분석
    - 맞춤형 마케팅 자동화
    - 다양한 채널 통합 (이메일, SMS, 카카오톡)
    
    비즈니스 현황:
    - 현재 고객사: 450개 기업
    - MRR: 5억원
    - 평균 고객 유지율: 92%
    - 팀 규모: 25명`,
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
    },
    seller: {
      id: 'seller1',
      email: 'seller@example.com',
      name: '김대표',
      role: 'SELLER',
      company: '테크스타트업',
      isVerified: true,
    }
  }

  if (id === '1') {
    return mockAsset
  }
  return null
}

interface PageProps {
  params: { id: string }
}

export default async function AssetDetailPage({ params }: PageProps) {
  const asset = await getAsset(params.id)

  if (!asset) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {asset.category}
                  </span>
                  {asset.trustScore >= 90 && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      검증됨
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-2">{asset.title}</h1>
                <p className="text-gray-600">{asset.summary}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">조회수</div>
                <div className="font-semibold">{asset.viewCount.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <div className="text-sm text-gray-500">희망 가격</div>
                <div className="text-xl font-bold text-primary">
                  ₩{(asset.askingPrice / 100000000).toFixed(1)}억
                </div>
              </div>
              {asset.financials && (
                <>
                  <div>
                    <div className="text-sm text-gray-500">월 매출</div>
                    <div className="text-xl font-semibold">
                      ₩{(asset.financials.monthlyRevenue / 100000000).toFixed(1)}억
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">월 이익</div>
                    <div className="text-xl font-semibold">
                      ₩{(asset.financials.monthlyProfit / 100000000).toFixed(1)}억
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">성장률</div>
                    <div className="text-xl font-semibold text-green-600">
                      +{asset.financials.growthRate}%
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Business Overview */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">비즈니스 개요</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {asset.description}
            </div>
          </div>

          {/* Financial Details */}
          {asset.financials && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">재무 정보</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">연간 실적</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">연 매출</span>
                      <span className="font-semibold">
                        ₩{(asset.financials.yearlyRevenue / 100000000).toFixed(1)}억
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">연 이익</span>
                      <span className="font-semibold">
                        ₩{(asset.financials.yearlyProfit / 100000000).toFixed(1)}억
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">가치 평가</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">기업 가치</span>
                      <span className="font-semibold">
                        ₩{((asset.financials.enterpriseValue || asset.askingPrice) / 100000000).toFixed(1)}억
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">P/E Ratio</span>
                      <span className="font-semibold">
                        {(asset.askingPrice / asset.financials.yearlyProfit).toFixed(1)}x
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">문서 자료</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="font-medium">재무제표 (최근 3년)</div>
                    <div className="text-sm text-gray-500">PDF, 2.3MB</div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                  NDA 서명 필요
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <div className="font-medium">사업 계획서</div>
                    <div className="text-sm text-gray-500">PDF, 1.8MB</div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm">
                  NDA 서명 필요
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Seller Info */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-4">판매자 정보</h3>
            {asset.seller && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xl font-semibold">
                      {asset.seller.name[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{asset.seller.name}</div>
                    <div className="text-sm text-gray-500">{asset.seller.company}</div>
                  </div>
                </div>
                {asset.seller.isVerified && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    인증된 판매자
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bid Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-4">제안하기</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">제안 금액</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="5,000,000,000"
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    원
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">메시지</label>
                <textarea
                  rows={4}
                  placeholder="판매자에게 전달할 메시지를 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
              >
                제안 보내기
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition">
                메시지 보내기
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                관심 자산 추가
              </button>
            </div>
          </div>

          {/* Trust Score */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold mb-3">신뢰도 점수</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {asset.trustScore}
              </div>
              <div className="text-sm text-gray-600">
                검증된 문서와 실적 기반
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}