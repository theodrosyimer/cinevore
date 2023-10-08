import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/app/(site-layout)/(protected)/(me)/me/(settings)/settings/profile-form"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export default async function SettingsProfilePage() {
  // const { user, isAdmin } = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
