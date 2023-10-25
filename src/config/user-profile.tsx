import { SiteLayoutConfig } from '@/types'

export const userNavigationConfig: SiteLayoutConfig = {
  mainNav: [
    // {
    //   title: 'Profile',
    //   href: '/me',
    // },
    {
      title: 'Films',
      href: '/me/films',
    },
    {
      title: 'Lists',
      href: '/me/lists',
    },
    {
      title: 'Reviews',
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
          title: 'Films',
          href: '/me/films',
          items: [],
        },
        {
          title: 'Lists',
          href: '/me/lists',
          items: [],
        },
        {
          title: 'Reviews',
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
