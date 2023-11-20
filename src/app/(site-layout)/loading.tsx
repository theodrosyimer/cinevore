import { Icons } from '@/components/icon/icons'

export default function Loading() {
  return (
    <section className="py-24">
      <div className="container grid place-items-center">
        <h2>Loading...</h2>
        <Icons.spinner className="h-4 w-4 animate-spin" />
      </div>
    </section>
  )
}
