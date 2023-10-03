export const metadata = {
  title: "Pricing Page",
  description: "Everything you need to know about pricing.",
}

export default function PricingPage({ params }: { params: { username: string } }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Pricing</h1>
    </>
  )
}
