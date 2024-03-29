import { headers } from 'next/headers'
import type Stripe from 'stripe'

import { env } from '@/env.js'
import { db } from '@/db'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return new Response(`Webhook Error: ${error.message}`, { status: 400 })
    }
    return new Response(null, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    // Retrieve the subscription details from Stripe.
    // const subscription = await stripe.subscriptions.retrieve(
    //   session.subscription,
    // )

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    // await db.user.update({
    //   where: {
    //     id: session?.metadata?.userId,
    //   },
    //   data: {
    //     stripeSubscriptionId: subscription.id,
    //     stripeCustomerId: subscription.customer!,
    //     stripePriceId: subscription.items.data[0].price.id,
    //     stripeCurrentPeriodEnd: new Date(
    //       subscription.current_period_end * 1000
    //     ),
    //   },
    // })
  }

  if (event.type === 'invoice.payment_succeeded') {
    // Retrieve the subscription details from Stripe.
    // const subscription = await stripe.subscriptions.retrieve(
    //   session.subscription,
    // )

    // Update the price id and set the new period end.
    // await db.update({
    //   where: {
    //     stripeSubscriptionId: subscription.id,
    //   },
    //   data: {
    //     stripePriceId: subscription.items.data[0].price.id,
    //     stripeCurrentPeriodEnd: new Date(
    //       subscription.current_period_end * 1000
    //     ),
    //   },
    // })
  }

  return new Response(null, { status: 200 })
}
