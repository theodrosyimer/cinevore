'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

import { MainNavItem } from '@/types';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils/utils';
import { Icons } from '@/components/icons';
import { MobileNav } from '@/components/mobile-nav';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

// export function MainNav({ items, children }: MainNavProps) {
//   const segment = useSelectedLayoutSegment()
//   const path = usePathname()

//   const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
//   // console.log('PATH:', path)

//   return (
//     <div className="flex gap-6 md:gap-10">
//       <Link href="/" className="hidden items-center space-x-2 md:flex">
//         <Icons.logo />
//         <span className="hidden font-bold sm:inline-block">
//           {siteConfig.name}
//         </span>
//       </Link>
//       {items?.length ? (
//         <nav className="hidden gap-6 md:flex">
//           {items?.map((item, index) => {
//             // console.log('ITEM_HREF:', item.href)
//             // console.log('SEGMENT:', segment)

//             // console.log('ITEM_HREF = SEGMENT:', item.href.startsWith(`/${segment}`))

//             return (
//               <Link
//                 key={index}
//                 href={item.disabled ? "#" : item.href}
//                 className={cn(
//                   "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
//                   item.href.startsWith(`/${segment}`)
//                     ? "text-foreground"
//                     : "text-foreground/60",
//                   // path === item.href ? "text-accent-foreground" : "transparent",
//                   item.disabled && "cursor-not-allowed opacity-80"
//                 )}
//               >
//                 {item.title}
//               </Link>
//             )
//           })}
//         </nav>
//       ) : null}
//       <button
//         className="flex items-center space-x-2 md:hidden"
//         onClick={() => setShowMobileMenu(!showMobileMenu)}
//       >
//         {showMobileMenu ? <Icons.close /> : <Icons.logo />}
//         <span className="font-bold">Menu</span>
//       </button>
//       {showMobileMenu && items && (
//         <MobileNav items={items}>{children}</MobileNav>
//       )}
//     </div>
//   )
// }
