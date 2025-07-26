'use client'

import React from 'react'
import type { FilterOptions } from '../types'

interface FilterPanelProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  className?: string
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  className = '',
}) => {
  const handleChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    })
  }

  const handleReset = () => {
    onFilterChange({
      type: '',
      priceRange: '',
      revenueRange: '',
      region: '',
      sortBy: 'latest',
    })
  }

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">필터</h2>
        <button
          onClick={handleReset}
          className="text-sm text-primary hover:text-primary-hover transition"
        >
          초기화
        </button>
      </div>

      <div className="space-y-6">
        {/* Asset Type */}
        <div>
          <h3 className="font-medium mb-3">자산 유형</h3>
          <div className="space-y-2">
            {[
              { value: '', label: '전체' },
              { value: 'SAAS', label: 'SaaS' },
              { value: 'ECOMMERCE', label: '이커머스' },
              { value: 'APP', label: '모바일 앱' },
              { value: 'OTHER', label: '기타' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value={option.value}
                  checked={filters.type === option.value}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="mr-2 text-primary focus:ring-primary"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">희망 가격</h3>
          <select
            value={filters.priceRange || ''}
            onChange={(e) => handleChange('priceRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div>
          <h3 className="font-medium mb-3">월 매출</h3>
          <select
            value={filters.revenueRange || ''}
            onChange={(e) => handleChange('revenueRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div>
          <h3 className="font-medium mb-3">지역</h3>
          <select
            value={filters.region || ''}
            onChange={(e) => handleChange('region', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">전체</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="인천">인천</option>
            <option value="부산">부산</option>
            <option value="대구">대구</option>
            <option value="대전">대전</option>
            <option value="광주">광주</option>
            <option value="울산">울산</option>
            <option value="기타">기타</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <h3 className="font-medium mb-3">정렬</h3>
          <select
            value={filters.sortBy || 'latest'}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="latest">최신순</option>
            <option value="price-low">가격 낮은순</option>
            <option value="price-high">가격 높은순</option>
            <option value="revenue">매출 높은순</option>
            <option value="trust">신뢰도순</option>
            <option value="views">조회순</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleReset}
        className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
      >
        필터 초기화
      </button>
    </div>
  )
}