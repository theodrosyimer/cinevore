import React from 'react'
import Navbar from './navbar'
import Logo from './logo'

export default function Header() {
  return (
    <header className=''>
      <div className="flex justify-between">
        <Logo />
        <Navbar />
      </div>
    </header>
  )
}
