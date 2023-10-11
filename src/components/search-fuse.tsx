'use client';

import * as React from 'react';
import Fuse from 'fuse.js';

import { cn } from '@/lib/utils/utils';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';

export type FuseResult<T> = Fuse.FuseResult<T>;

const names = ['Tim', 'Joe', 'Bel', 'Lee'];

interface SearchProps extends React.HTMLAttributes<HTMLFormElement> {}

export function Search({ className, ...props }: SearchProps) {
  const [results, setResults] = React.useState<FuseResult<string>[]>([]);
  const searchParams = useSearchParams();
  console.log(searchParams.get('search'));

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    return toast({
      title: 'Not implemented',
      description: "We're still working on the search.",
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn('relative w-full ml-4', className)}
      {...props}
    >
      <Input
        type="search"
        placeholder="Search for Films, Actors..."
        className="h-8 w-full sm:w-64 sm:pr-12  md:max-w-40"
        onChange={async (e) => {
          const { value } = e.currentTarget;
          // Dynamically load fuse.js
          const Fuse = (await import('fuse.js')).default;
          const fuse = new Fuse(names);

          setResults(fuse.search(value));
        }}
      />
      {/* <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
      <br /> */}

      {/* <pre>Results: {JSON.stringify(results, null, 2)}</pre> */}
    </form>
  );
}
