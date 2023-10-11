'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound({ params }: { params: { pathname: string } }) {
  const router = useRouter();
  return (
    <div className="bg-not-found h-screen w-screen grid items-start justify-center img">
      <Link
        href="#"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        Back
      </Link>
      <div className="p-20">
        <h2 className="text-center">{/* {params.pathname} */}Not Found</h2>
        <p>Could not find requested resource</p>
      </div>
    </div>
  );
}
