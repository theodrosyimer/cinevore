import { MovieBackdrop } from '@/components/film-backdrop'
import { globalConfig } from '@/lib/tmdb/src/tmdb'

export default function GradientPage() {
  return (
    <div className="grid place-items-center gap-8">
      <MovieBackdrop
        url={`${globalConfig.IMAGE_BASE_URI}/original/yUa0iCocBPsGJ79BwrshHqz45Qc.jpg`}
        altText=""
        className="rounded-b-md bg-gradient-to-tr blur-[2px] brightness-50"
      />
      <div className="grid aspect-square w-48 rounded-md border">
        <div className="grid aspect-square w-full rounded-md border border-red-700"></div>
        <div className="absolute aspect-square w-4 self-center justify-self-end border"></div>
      </div>
    </div>
  )
}
