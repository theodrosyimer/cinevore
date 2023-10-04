import { SiteLayoutConfig } from "@/types"

export const userNavigationConfig: SiteLayoutConfig = {
  mainNav: [
    {
      title: "Profile",
      href: "/me",
    },
    {
      title: "Films",
      href: "/me/films",
    },
    {
      title: "Diary",
      href: "/me/diary",
    },
    {
      title: "Reviews",
      href: "/me/reviews",
    },
    {
      title: "Watchlist",
      href: "/me/watchlist",
    },
    {
      title: "Likes",
      href: "/me/likes",
      label: "admin",
    }
  ],
  sidebarNav: []
}
