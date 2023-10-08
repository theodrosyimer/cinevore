'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Link className="flex" href="/">
      <svg height="24" width="24">
        Logo
      </svg>
      <span>Cinevore</span>
    </Link>
  );
}
