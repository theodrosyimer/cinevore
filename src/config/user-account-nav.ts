import { type MainNavItem } from '@/types'

export const userAccountNavConfig = [
  {
    title: 'Profile',
    href: '/me',
  },
  {
    title: 'New list',
    href: '/list/new',
  },
  {
    title: 'Settings',
    href: '/settings',
    disabled: true,
  },
] satisfies MainNavItem[]
