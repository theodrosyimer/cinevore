import React from 'react'
import Navbar from './navbar'
import Logo from './logo'
import { MainNav } from '@/components/main-nav'
import { siteLayoutConfig } from '@/config/site-nav'

export function Header() {
  return (
    <header className=''>
      <div className="">
        {/* <Logo /> */}
        {/* <Navbar /> */}
        <MainNav items={siteLayoutConfig.mainNav} />
      </div>
    </header>
  )
}
