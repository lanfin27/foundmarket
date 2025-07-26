import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Asset } from '@/types'

// Mock data - replace with API calls
const featuredAssets: Asset[] = [
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
  {
    id: '2',
    sellerId: 'seller2',
    type: 'ECOMMERCE',
    category: '이커머스',
    title: '프리미엄 패션 이커머스',
    summary: '네이버 스마트스토어 파워 판매자, 월 매출 3억원',
    description: '',
    status: 'ACTIVE',
    askingPrice: 2500000000,
    region: '경기',
    industry: '패션',
    viewCount: 892,
    trustScore: 88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    sellerId: 'seller3',
    type: 'APP',
    category: '모바일 앱',
    title: '헬스케어 트래킹 앱',
    summary: 'MAU 50만명, 구독 수익 모델',
    description: '',
    status: 'ACTIVE',
    askingPrice: 3000000000,
    region: '서울',
    industry: '헬스케어',
    viewCount: 756,
    trustScore: 92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const categories = [
  { id: 'saas', name: 'SaaS', icon: '☁️', count: 245 },
  { id: 'ecommerce', name: '이커머스', icon: '🛒', count: 189 },
  { id: 'app', name: '모바일 앱', icon: '📱', count: 156 },
  { id: 'content', name: '콘텐츠', icon: '📝', count: 98 },
  { id: 'game', name: '게임', icon: '🎮', count: 67 },
  { id: 'other', name: '기타', icon: '📦', count: 134 },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              원클릭 매물 등록, 국세청 재무연동으로 더 믿을 수 있게
            </h1>
            <p className="text-xl text-white/90 mb-8">
              클릭 한 번으로 매물 등록, 자동으로 불러오는 재무정보로 거래의 신뢰를 높였습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                자산 둘러보기
              </Link>
              <Link
                href="/create-asset"
                className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                자산 등록하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">₩125억</div>
              <div className="text-gray-600 mt-1">누적 거래액</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">892</div>
              <div className="text-gray-600 mt-1">등록된 자산</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">15,234</div>
              <div className="text-gray-600 mt-1">활성 사용자</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-gray-600 mt-1">거래 성공률</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Assets */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">추천 자산</h2>
            <Link href="/search" className="text-primary hover:text-primary-hover transition">
              모두 보기 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAssets.map((asset) => (
              <Link
                key={asset.id}
                href={`/asset/${asset.id}`}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {asset.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    조회 {asset.viewCount.toLocaleString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{asset.title}</h3>
                <p className="text-gray-600 mb-4">{asset.summary}</p>
                
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-sm text-gray-500">희망 가격</div>
                    <div className="text-2xl font-bold text-primary">
                      ₩{(asset.askingPrice / 100000000).toFixed(1)}억
                    </div>
                  </div>
                  {asset.financials && (
                    <div className="text-right">
                      <div className="text-sm text-gray-500">월 매출</div>
                      <div className="font-semibold">
                        ₩{(asset.financials.monthlyRevenue / 100000000).toFixed(1)}억
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium">{asset.trustScore}</span>
                  </div>
                  <span className="text-sm text-gray-400">신뢰 점수</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">카테고리별 자산</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/search?category=${category.id}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}개</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            당신의 비즈니스를 다음 단계로
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            전문가의 검증을 거친 안전한 거래, 투명한 에스크로 시스템으로 
            믿고 거래할 수 있습니다.
          </p>
          <Link
            href="/auth?mode=register"
            className="inline-block px-8 py-3 bg-white text-secondary rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            지금 시작하기
          </Link>
        </div>
      </section>
    </div>
  )
}
