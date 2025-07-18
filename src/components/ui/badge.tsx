import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'capitalize inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',

        info: 'border-transparent bg-info text-white shadow hover:bg-info/80',
        warning: 'border-transparent bg-warning text-white shadow hover:bg-warning/80',
        success: 'border-transparent bg-success text-white shadow hover:bg-success/80',
        error: 'border-transparent bg-error text-white shadow hover:bg-error/80',
        pending: 'border-transparent bg-pending-gradient text-white shadow hover:bg-pending-gradient/80',
        canceled: 'border-transparent bg-canceled-gradient text-white shadow hover:bg-canceled-gradient/80',
        'main-currency': 'border-transparent bg-main-currency text-white shadow hover:bg-main-currency/80',
        tether: 'border-transparent bg-tether-gradient text-white shadow hover:bg-tether-gradient/80',
        completed: 'border-transparent bg-success text-white shadow hover:bg-success/80',

        request: 'border-transparent bg-pending-gradient text-white shadow hover:bg-pending-gradient/80',
        accept: 'border-transparent bg-success text-white shadow hover:bg-success/80',
        cancel: 'border-transparent bg-canceled-gradient text-white shadow hover:bg-canceled-gradient/80'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  // Check if the variant exists in badgeVariants
  const variantKeys = [
    'default',
    'secondary',
    'destructive',
    'outline',
    'info',
    'warning',
    'success',
    'error',
    'pending',
    'canceled',
    'main-currency',
    'tether',
    'completed',
    'request',
    'accept',
    'cancel'
  ]
  const safeVariant = variantKeys.includes(variant as string) ? variant : 'default'

  return <div className={cn(badgeVariants({ variant: safeVariant }), className)} {...props} />
}

export { Badge, badgeVariants }
