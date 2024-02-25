import { type SubscriptionPlan } from '@/types'
import { env } from '@/env.js'

export const freePlan = {
  name: 'Free',
  description:
    'The free plan is limited to 3 films. Upgrade to the PRO plan for unlimited films.',
  stripePriceId: '',
} satisfies SubscriptionPlan

export const proPlan = {
  name: 'PRO',
  description: 'The PRO plan has unlimited films.',
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID ?? '',
} satisfies SubscriptionPlan
