import Link from 'next/link'
import React from 'react'

export function Footer() {
  return (
    <footer className='grid justify-items-center'>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/help">Help</Link>
        </li>
      </ul>
      <p>Copyright &copy; 2023 - cinevore.com</p>
    </footer>
  )
}
