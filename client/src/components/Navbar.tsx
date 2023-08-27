import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <nav>
      <ul>
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
          <Link href="/login">Log In</Link>
        </li>
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  )
}
