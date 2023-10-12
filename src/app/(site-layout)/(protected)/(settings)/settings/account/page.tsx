import { Separator } from '@/components/ui/separator'
import { AccountForm } from '@/app/(site-layout)/(protected)/(settings)/settings/account/account-form'

import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function SettingsAccountPage() {
  // const { user, isAdmin } = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}
