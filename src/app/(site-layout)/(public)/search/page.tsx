'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  return (
    <div className="mx-auto grid w-full justify-items-start space-y-6 sm:w-[350px]"></div>
  )
}
