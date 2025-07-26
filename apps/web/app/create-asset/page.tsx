'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const steps = [
  { id: 1, name: '기본 정보', description: '자산의 기본 정보를 입력하세요' },
  { id: 2, name: '재무 정보', description: '매출, 이익 등 재무 정보를 입력하세요' },
  { id: 3, name: '문서 업로드', description: '관련 문서를 업로드하세요' },
  { id: 4, name: '검토 및 제출', description: '입력한 정보를 검토하고 제출하세요' },
]

export default function CreateAssetPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    type: '',
    category: '',
    title: '',
    summary: '',
    description: '',
    askingPrice: '',
    region: '',
    industry: '',
    // Step 2
    monthlyRevenue: '',
    monthlyProfit: '',
    yearlyRevenue: '',
    yearlyProfit: '',
    growthRate: '',
    // Step 3
    documents: []
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData)
    router.push('/profile')
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step.id === currentStep
                        ? 'bg-primary text-white'
                        : step.id < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.id < currentStep ? '✓' : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium">{step.name}</div>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">기본 정보</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">자산 유형 *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">선택하세요</option>
                  <option value="SAAS">SaaS</option>
                  <option value="ECOMMERCE">이커머스</option>
                  <option value="APP">모바일 앱</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">카테고리 *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="예: B2B SaaS, 패션 이커머스"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">제목 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="자산의 제목을 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">요약 설명 *</label>
                <input
                  type="text"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="한 줄로 자산을 설명하세요"
                  maxLength={100}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">상세 설명 *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="비즈니스에 대해 자세히 설명하세요"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">희망 가격 (원) *</label>
                  <input
                    type="number"
                    value={formData.askingPrice}
                    onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                    placeholder="5000000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">지역</label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="예: 서울, 경기"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">재무 정보</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">월 매출 (원) *</label>
                  <input
                    type="number"
                    value={formData.monthlyRevenue}
                    onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                    placeholder="500000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">월 이익 (원) *</label>
                  <input
                    type="number"
                    value={formData.monthlyProfit}
                    onChange={(e) => setFormData({ ...formData, monthlyProfit: e.target.value })}
                    placeholder="150000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">연 매출 (원) *</label>
                  <input
                    type="number"
                    value={formData.yearlyRevenue}
                    onChange={(e) => setFormData({ ...formData, yearlyRevenue: e.target.value })}
                    placeholder="6000000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">연 이익 (원) *</label>
                  <input
                    type="number"
                    value={formData.yearlyProfit}
                    onChange={(e) => setFormData({ ...formData, yearlyProfit: e.target.value })}
                    placeholder="1800000000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">전년 대비 성장률 (%) *</label>
                <input
                  type="number"
                  value={formData.growthRate}
                  onChange={(e) => setFormData({ ...formData, growthRate: e.target.value })}
                  placeholder="300"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 정확한 재무 정보 입력은 구매자의 신뢰를 높이고 거래 성사율을 향상시킵니다.
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">문서 업로드</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    클릭하여 파일을 선택하거나 드래그 앤 드롭하세요
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">권장 문서</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 재무제표 (최근 3년)</li>
                    <li>• 사업자등록증</li>
                    <li>• 사업 계획서</li>
                    <li>• 고객 데이터 요약</li>
                    <li>• 법인등기부등본</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ 모든 문서는 NDA 서명 후에만 구매자에게 공개됩니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">검토 및 제출</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">기본 정보</h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">자산 유형:</dt>
                      <dd className="font-medium">{formData.type || '-'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">희망 가격:</dt>
                      <dd className="font-medium">
                        {formData.askingPrice ? `₩${parseInt(formData.askingPrice).toLocaleString()}` : '-'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">재무 정보</h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">월 매출:</dt>
                      <dd className="font-medium">
                        {formData.monthlyRevenue ? `₩${parseInt(formData.monthlyRevenue).toLocaleString()}` : '-'}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">성장률:</dt>
                      <dd className="font-medium">{formData.growthRate ? `${formData.growthRate}%` : '-'}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm text-gray-600">
                      제공한 모든 정보가 사실이며, 허위 정보 제공 시 법적 책임을 질 수 있음을 이해합니다.
                    </span>
                  </label>
                  <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm text-gray-600">
                      파운드마켓의 이용약관 및 개인정보처리방침에 동의합니다.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg transition ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              이전
            </button>
            
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
              >
                다음
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                제출하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}