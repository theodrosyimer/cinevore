import { type Icon } from '@/components/icon/icons'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { type Features } from '@/config/features'

export type FeatureCardProps = {
  Icon: Icon
  description: Features['description']
}

export function FeatureCard(props: FeatureCardProps) {
  return (
    <Card className="grid items-center p-4">
      <CardContent className="grid grid-cols-[auto,_1fr] items-center gap-8 p-2">
        <props.Icon className="place-self-center md:h-10 md:w-10" />
        <CardDescription className="sm:text-foreground">
          {props.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
