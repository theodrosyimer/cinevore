import { Separator } from "@/components/ui/separator"
import { AppearanceForm } from "@/app/(site-layout)/(protected)/(me)/me/(settings)/settings/appearance/appearance-form"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export default async function SettingsAppearancePage() {
  // const { user, isAdmin } = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}
