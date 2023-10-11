'use client';

import { CardSkeleton } from '@/components/card-skeleton';
import { MovieArtwork, MovieArtworkProps } from '@/components/film-artwork';
import { useFilms } from '@/hooks/useFilms-zod';
import { getImageFormatSize } from '@/lib/tmdb/src/utils';
import { TMDBImageSizesCategory } from '@/lib/tmdb/types/tmdb-api';
import { handleSlug } from '@/lib/utils/slugify';
import { cn } from '@/lib/utils/utils';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export type FilmCardProps = Pick<MovieArtworkProps, 'aspectRatio'> & {
  limit?: number;
  className?: string;
  width: TMDBImageSizesCategory[keyof TMDBImageSizesCategory];
};

export function FilmCardList(
  {
    limit = 14,
    className,
    aspectRatio,
    width,
  }: FilmCardProps = {} as MovieArtworkProps
) {
  const router = useRouter();
  const { data: films, isLoading } = useFilms();

  const handleTitleSlug = useCallback(handleSlug, []);

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (!films) {
    return <div>No films found</div>;
  }

  if (limit) {
    films.results = films.results.slice(0, limit);
  }

  return (
    <>
      {films.results.map((film) => (
        // <FilmCard key={film.id} film={film} />
        <MovieArtwork
          key={film.id}
          movieId={film.id.toString()}
          movie={film}
          className={cn('', className)}
          aspectRatio={aspectRatio ?? 'portrait'}
          // TODO: fix `width` type
          // @ts-ignore
          width={getImageFormatSize('poster_sizes', width)}
          height={120}
          onClick={(e) => {
            e.preventDefault();
            router.push(
              `/film/${handleTitleSlug(film?.title ?? '')?.slug}/?id=${film.id}`
            );
          }}
        />
      ))}
    </>
  );
}
