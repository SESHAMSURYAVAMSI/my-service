export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  PROJECTS: '/projects',
  TEAM: '/team',
  BILLING: '/billing',
  SETTINGS: '/settings',
  ADMIN: '/admin',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
} as const

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.ANALYTICS,
  ROUTES.PROJECTS,
  ROUTES.TEAM,
  ROUTES.BILLING,
  ROUTES.SETTINGS,
  ROUTES.ADMIN,
]