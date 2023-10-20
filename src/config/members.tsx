import { MainNavItem, SidebarNavItem, SiteLayoutConfig } from '@/types'

type MemberNavConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const membersNavConfig: MemberNavConfig = {
  mainNav: [
    {
      title: 'Profile',
      href: 'members',
      path: '/',
    },
    {
      title: 'Films',
      href: 'members',
      path: '/films',
    },
    {
      title: 'Lists',
      href: 'members',
      path: '/lists',
    },
    {
      title: 'Reviews',
      href: 'members',
      path: '/reviews',
      disabled: false,
    },
    {
      title: 'Watchlist',
      href: 'members',
      path: '/watchlist',
      disabled: true,
    },
    {
      title: 'Likes',
      href: 'members',
      path: '/likes',
      label: 'admin',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Members',
      href: 'members',
      items: [
        {
          title: 'Profile',
          href: 'members',
          path: '/',
          items: [],
        },
        {
          title: 'Films',
          href: 'members',
          path: '/films',
          items: [],
        },
        {
          title: 'Lists',
          href: 'members',
          path: '/lists',
          items: [],
        },
        {
          title: 'Reviews',
          href: 'members',
          path: '/reviews',
          disabled: true,
          items: [],
        },
        {
          title: 'Watchlist',
          href: 'members',
          path: '/watchlist',
          disabled: true,
          items: [],
        },
        {
          title: 'Likes',
          href: 'members',
          path: '/likes',
          items: [],
          label: 'admin',
        },
      ],
    },
  ],
}
