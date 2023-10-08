import { Separator } from "@/components/ui/separator"
import { NotificationsForm } from "@/app/(site-layout)/(protected)/(me)/me/(settings)/settings/notifications/notifications-form"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export default async function SettingsNotificationsPage() {
  // const { user, isAdmin } = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  )
}
