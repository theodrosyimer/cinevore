import { DocsConfig } from "@/types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      href: '',
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
      ],
    },
    {
      title: "Documentation",
      href: '',
      items: [
        {
          title: "Introduction",
          href: "/docs/documentation",
          items: [],
        },
        {
          title: "Contentlayer",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Components",
          href: "/docs/documentation/components",
          items: [],
        },
        {
          title: "Code Blocks",
          href: "/docs/documentation/code-blocks",
          items: [],
        },
        {
          title: "Style Guide",
          href: "/docs/documentation/style-guide",
          items: [],
        },
        {
          title: "Search",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
      ],
    },
    {
      title: "Blog",
      href: '',
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Build your own",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Writing Films",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
      ],
    },
    {
      title: "Dashboard",
      href: '',
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Layouts",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Server Components",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Authentication",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Database with Prisma",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "API Routes",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
      ],
    },
    {
      title: "Marketing Site",
      href: '',
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "File Structure",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Tailwind CSS",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
        {
          title: "Typography",
          href: "/docs/in-progress",
          disabled: true,
          items: [],
        },
      ],
    },
  ],
}
