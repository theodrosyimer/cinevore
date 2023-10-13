import { FilmCardList } from '@/components/film-card-list'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import * as dotenv from 'dotenv'
dotenv.config()

export const metadata = {
  title: 'Films Search Page',
  description: 'Find all your preferred films here.',
}

export default function FilmsPage({
  params,
}: {
  params: { username: string }
}) {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">Search for Films</h1>
      <div className="relative">
        <ScrollArea>
          <FilmCardList aspectRatio={'portrait'} width="w154" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}
