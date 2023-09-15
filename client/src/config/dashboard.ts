import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Users",
      href: "/me/dashboard",
      icon: "media",
    },
    {
      title: "Reviews",
      href: "/me/dashboard/reviews",
      icon: "media",
    },
    {
      title: "Comments",
      href: "/me/dashboard/comments",
      icon: "media",
    },
    {
      title: "Billing",
      href: "/me/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/me/dashboard/settings",
      icon: "settings",
    },
  ],
}
