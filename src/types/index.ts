import { Icons } from "@/components/icons"
import { SelectUser } from "@/types/db"

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}


// export type NavItem = {
//   title: string
//   href: string
//   disabled?: boolean
//   external?: boolean
//   icon?: keyof typeof Icons
//   label?: string
// }

// export type MainNavItem = NavItem

// export type SidebarNavItem = Omit<NavItem, 'href'> & (
//   | {
//     href: string
//     items?: never
//   }
//   | {
//     href?: string
//     items: NavLink[]
//   }
// )

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SiteLayoutConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type AdminDashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SettingsConfig = {
  // mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<SelectUser, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }
