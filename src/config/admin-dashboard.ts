import { AdminDashboardConfig } from '@/types'

export const adminDashboardConfig: AdminDashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: 'Users',
      href: '/admin/dashboard',
      icon: 'user',
      items: [],
    },
    {
      title: 'Films',
      href: '/admin/dashboard/films',
      icon: 'logo',
      disabled: false,
      items: [],
    },
    {
      title: 'Lists',
      href: '/admin/dashboard/lists',
      icon: 'logo',
      disabled: true,
      items: [],
    },
    {
      title: 'Reviews',
      href: '/admin/dashboard/reviews',
      icon: 'post',
      disabled: true,
      items: [],
    },
    {
      title: 'Comments',
      href: '/admin/dashboard/comments',
      icon: 'comment',
      disabled: true,
      items: [],
    },
    // {
    //   title: "Pricing",
    //   href: "/admin/dashboard/pricing",
    //   icon: "billing",
    //   items: [],
    // },
    {
      title: 'Settings',
      href: '/admin/dashboard/settings',
      icon: 'settings',
      items: [],
    },
  ],
}
