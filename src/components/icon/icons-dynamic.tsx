import dynamic from 'next/dynamic'
import { type LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { cn } from '@/lib/utils/utils'

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

export function Icon({ name, className, ...props }: IconProps) {
  const LucideIcon = dynamic(dynamicIconImports[name])

  return <LucideIcon className={cn('', className)} {...props} />
}
