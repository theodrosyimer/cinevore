'use client'

import React from 'react'
import { useThemeContext } from '../contexts/theme'
import Link from 'next/link'

export default function Logo() {
  const { theme } = useThemeContext()
  return (
    <Link href='/'>
      <span>{theme} theme</span>
      <svg></svg>
    </Link>
  )
}
