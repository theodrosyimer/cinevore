import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Users",
      href: "/admin/dashboard",
      icon: "media",
      items: [],
    },
    {
      title: "Reviews",
      href: "/admin/dashboard/reviews",
      icon: "media",
      items: [],
    },
    {
      title: "Comments",
      href: "/admin/dashboard/comments",
      icon: "media",
      items: [],
    },
    {
      title: "Pricing",
      href: "/admin/dashboard/pricing",
      icon: "billing",
      items: [],
    },
    {
      title: "Settings",
      href: "/admin/dashboard/settings",
      icon: "settings",
      items: [],
    },
  ],
}
