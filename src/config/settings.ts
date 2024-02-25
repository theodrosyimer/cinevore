import type { SettingsConfig } from '@/types'

export const settingsConfig = {
  sidebarNav: [
    {
      title: 'Account',
      href: '/settings',
      items: [],
    },
    // {
    //   title: 'Account',
    //   href: '/settings/account',
    //   items: [],
    // },
    {
      title: 'Password',
      href: '/settings/password',
      items: [],
      disabled: true,
    },

    {
      title: 'Avatar',
      href: '/settings/avatar',
      items: [],
    },
    {
      title: 'Appearance',
      href: '/settings/appearance',
      items: [],
    },
    {
      title: 'Notifications',
      href: '/settings/notifications',
      items: [],
      disabled: true,
    },
  ],
} satisfies SettingsConfig
