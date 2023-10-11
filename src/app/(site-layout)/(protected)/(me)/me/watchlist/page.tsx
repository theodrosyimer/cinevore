import { FilmCardList } from '@/components/film-card-list';

export const metadata = {
  title: 'Diary Page',
  description: 'Your diary of films.',
};

export default async function DiaryPage({
  params,
}: {
  params: {
    username: string;
    id: number;
  };
}) {
  // const { user, isAdmin } = await getCurrentUser()

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Watchlist</h1>

      <section>
        <FilmCardList aspectRatio="portrait" width="w92" />
      </section>
    </>
  );
}
