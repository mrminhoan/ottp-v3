import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
// [&_svg:not([class*='size-'])]:size-4
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:opacity-90',
        destructive:
          'bg-destructive text-white shadow-xs hover:opacity-90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:opacity-80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',

        success: 'bg-success text-white shadow-xs hover:opacity-90',
        warning: 'bg-warning text-secondary-foreground shadow-xs hover:opacity-90',
        info: 'bg-info text-white shadow-xs hover:opacity-90',
        error: 'bg-error text-secondary-foreground shadow-xs hover:opacity-90',
        cancel: 'bg-disabled text-white shadow-xs hover:opacity-90'
      },
      size: {
        default: 'px-4 py-2 text-sm rounded-md gap-2',
        sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
        lg: 'px-6 py-3 text-base rounded-lg gap-2',
        icon: 'p-2 rounded-md'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return <Comp data-slot='button' className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
