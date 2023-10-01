import { SubscriptionPlan } from "@/types"
// import { env } from "@env.mjs"
import * as dotenv from "dotenv"
dotenv.config()

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 films. Upgrade to the PRO plan for unlimited films.",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited films.",
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}
