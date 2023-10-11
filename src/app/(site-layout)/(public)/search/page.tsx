'use client';

import { Search } from '@/components/search-input';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  return (
    <div className="grid justify-items-start mx-auto w-full space-y-6 sm:w-[350px]"></div>
  );
}
