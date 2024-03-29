import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/films">all films</Link>
      </p>
    </div>
  )
}
