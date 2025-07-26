export interface Asset {
  id: string
  sellerId: string
  type: 'SAAS' | 'ECOMMERCE' | 'APP' | 'OTHER'
  category: string
  title: string
  summary: string
  description: string
  status: 'DRAFT' | 'PENDING_VERIFICATION' | 'ACTIVE' | 'SOLD' | 'WITHDRAWN'
  askingPrice: number
  region?: string
  industry?: string
  viewCount: number
  trustScore: number
  createdAt: Date
  updatedAt: Date
  financials?: Financials
  seller?: User
}

export interface Financials {
  id: string
  assetId: string
  monthlyRevenue: number
  monthlyProfit: number
  yearlyRevenue: number
  yearlyProfit: number
  growthRate: number
  enterpriseValue?: number
  valuation?: number
}

export interface User {
  id: string
  email: string
  name: string
  role: 'BUYER' | 'SELLER' | 'ADMIN'
  profileImage?: string
  company?: string
  bio?: string
  isVerified: boolean
}

export interface Bid {
  id: string
  userId: string
  assetId: string
  bidAmount: number
  message?: string
  isAccepted: boolean
  createdAt: Date
}