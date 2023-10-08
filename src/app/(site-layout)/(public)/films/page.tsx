import FilmCardList from '@/components/film-card-list';
import { MovieArtwork } from '@/components/films-artwork-slider';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import * as dotenv from 'dotenv';
dotenv.config();

export const metadata = {
  title: 'Films Search Page',
  description: 'Find all your preferred films here.',
};

export default function FilmsPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Search for Films</h1>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            <FilmCardList />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
