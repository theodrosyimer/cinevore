import { FilmCard } from "@/components/film-card"

export const metadata = {
  title: "Film's Details Page",
  description: "All the details of the film you searched for.",
}

export default function FilmPage({ params }: { params: { title: string } }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Film Description
      </h1>
      <p className='text-center'>Details of the film you searched for.</p>
      <div>Film: {params.title}</div>
    </>
  )
}
