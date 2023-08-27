import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer>
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
      <p>Copyright &copy; 2023 - filmovore.com</p>
    </footer>
  )
}
