import { userNavigationConfig } from '@/config/user-navigation';
import { SiteLayoutConfig } from '@/types';

export const siteLayoutConfig: SiteLayoutConfig = {
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
    {
      title: 'Pricing',
      href: '/pricing',
    },
    {
      title: 'Admin Dashboard',
      href: '/admin/dashboard',
      label: 'admin',
    },
  ],
  sidebarNav: userNavigationConfig.sidebarNav,
};
