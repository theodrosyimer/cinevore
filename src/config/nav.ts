import { userNavigationConfig } from '@/config/user-profile'
import { type SiteLayoutConfig } from '@/types'

export const siteLayoutConfig = {
  mainNav: [
    {
      title: 'Films',
      href: '/films',
    },
    {
      title: 'Lists',
      href: '/lists',
    },
    {
      title: 'Members',
      href: '/members',
    },
    {
      title: 'Features',
      href: '/#features',
    },
    // {
    //   title: 'Pricing',
    //   href: '/pricing',
    // },
    {
      title: 'Admin',
      href: '/admin/dashboard',
      label: 'admin',
    },
  ],
  sidebarNav: userNavigationConfig.sidebarNav,
} satisfies SiteLayoutConfig
