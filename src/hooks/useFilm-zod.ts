import { searchByID } from '@/lib/tmdb/src/tmdb';
import { useQuery } from '@tanstack/react-query';

async function getFilmById(id: string) {
  const data = await searchByID({ id, category: 'movie' });
  return data;
}

export function useFilm(id: string) {
  const filmData = useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilmById(id),
  });
  return filmData;
}
