export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  plan: 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

export interface Invoice {
  id: string
  userId: string
  amount: number
  currency: string
  status: 'paid' | 'pending' | 'failed'
  dueDate: Date
  paidDate?: Date
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'active' | 'completed' | 'on_hold'
  progress: number
  dueDate: Date
  team: string[]
}

export interface AnalyticsData {
  date: string
  visitors: number
  conversions: number
  revenue: number
}