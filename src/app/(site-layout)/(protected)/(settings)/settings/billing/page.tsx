import { getCurrentUser } from '@/lib/session'
import { stripe } from '@/lib/stripe'
// import { getUserSubscriptionPlan } from '@/lib/subscription'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BillingForm } from '@/app/(site-layout)/(protected)/_components/billing-form'
import { DashboardHeader } from '@/app/(site-layout)/(protected)/_components/dashboard-header'
import { Icons } from '@/components/icon/icons'
import { DashboardShell } from '@/app/(site-layout)/(protected)/_components/shell'

export const metadata = {
  title: 'Billing',
  description: 'Manage billing and your subscription plan.',
}

export default async function BillingPage() {
  const { user } = await getCurrentUser()

  if (!user) {
    return null
  }

  // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // // If user has a pro plan, check cancel status on Stripe.
  // let isCanceled = false
  // if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
  //   const stripePlan = await stripe.subscriptions.retrieve(
  //     subscriptionPlan.stripeSubscriptionId,
  //   )
  //   isCanceled = stripePlan.cancel_at_period_end
  // }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Taxonomy app is a demo app using a Stripe test environment. You can
            find a list of test card numbers on the{' '}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
        {/* <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        /> */}
      </div>
    </DashboardShell>
  )
}
