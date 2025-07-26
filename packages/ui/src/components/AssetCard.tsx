import React from 'react'
import Link from 'next/link'
import type { Asset } from '../types'

interface AssetCardProps {
  asset: Asset
  className?: string
  showFinancials?: boolean
  onFavorite?: (assetId: string) => void
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  className = '',
  showFinancials = true,
  onFavorite,
}) => {
  const formatPrice = (price: number) => {
    return `₩${(price / 100000000).toFixed(1)}억`
  }

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'SAAS':
        return 'bg-blue-100 text-blue-700'
      case 'ECOMMERCE':
        return 'bg-purple-100 text-purple-700'
      case 'APP':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusBadge = () => {
    if (asset.trustScore >= 90) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
          검증됨
        </span>
      )
    }
    if (asset.status === 'PENDING_VERIFICATION') {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
          검증 중
        </span>
      )
    }
    return null
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${className}`}>
      <Link href={`/asset/${asset.id}`} className="block p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(asset.type)}`}>
              {asset.category}
            </span>
            {getStatusBadge()}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              조회 {asset.viewCount.toLocaleString()}
            </span>
            {onFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onFavorite(asset.id)
                }}
                className="text-gray-400 hover:text-red-500 transition"
                aria-label="관심 자산 추가"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{asset.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{asset.summary}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500">희망 가격</div>
            <div className="text-lg font-bold text-primary">
              {formatPrice(asset.askingPrice)}
            </div>
          </div>
          {showFinancials && asset.financials && (
            <div>
              <div className="text-sm text-gray-500">월 매출</div>
              <div className="text-lg font-semibold">
                {formatPrice(asset.financials.monthlyRevenue)}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {asset.region && <span>{asset.region}</span>}
            {asset.industry && (
              <>
                <span className="text-gray-300">•</span>
                <span>{asset.industry}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium">{asset.trustScore}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}