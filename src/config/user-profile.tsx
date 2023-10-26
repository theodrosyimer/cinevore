import { SiteLayoutConfig } from '@/types'

export const userNavigationConfig: SiteLayoutConfig = {
  mainNav: [
    {
      title: 'Profile',
      href: '/me',
    },
    {
      title: 'My Films',
      href: '/me/films',
    },
    {
      title: 'My Lists',
      href: '/me/lists',
    },
    {
      title: 'My Reviews',
      href: '/me/reviews',
      disabled: false,
    },
    {
      title: 'Watchlist',
      href: '/me/watchlist',
      disabled: true,
    },
    {
      title: 'Likes',
      href: '/me/likes',
      label: 'admin',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Me',
      href: '/me',
      items: [
        // {
        //   title: 'Profile',
        //   href: '/me',
        //   items: [],
        // },
        {
          title: 'My Films',
          href: '/me/films',
          items: [],
        },
        {
          title: 'My Lists',
          href: '/me/lists',
          items: [],
        },
        {
          title: 'My Reviews',
          href: '/me/reviews',
          disabled: false,
          items: [],
        },
        {
          title: 'Watchlist',
          href: '/me/watchlist',
          disabled: true,
          items: [],
        },
        {
          title: 'Likes',
          href: '/me/likes',
          disabled: true,
          items: [],
          // label: 'admin',
        },
      ],
    },
  ],
}
