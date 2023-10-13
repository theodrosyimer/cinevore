import { MovieBackdrop } from '@/components/film-backdrop'
import { globalConfig } from '@/lib/tmdb/src/tmdb'

export default function GradientPage() {
  return (
    <div className="grid place-items-center">
      <MovieBackdrop
        url={`${globalConfig.IMAGE_BASE_URI}/original/yUa0iCocBPsGJ79BwrshHqz45Qc.jpg`}
        altText=""
        className="rounded-b-md bg-gradient-to-tr blur-[2px] brightness-50"
      />
    </div>
  )
}
