import { MainNavItem } from '@/types'

export const userAccountNavConfig: MainNavItem[] = [
  {
    title: 'Profile',
    href: '/me/films',
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
]
