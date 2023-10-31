import { ProfileForm } from '@/app/(site-layout)/(protected)/(settings)/settings/profile-form'
import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'User settings and preferences.',
}

export default async function SettingsProfilePage() {
  // const { user, isAdmin } = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings.
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </>
  )
}
