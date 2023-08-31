import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav>
      <ul className='flex gap-4'>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/films">Films</Link>
        </li>
        <li>
          <Link href="/lists">Lists</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Signup</Link>
        </li>
      </ul>
    </nav>
  )
}
