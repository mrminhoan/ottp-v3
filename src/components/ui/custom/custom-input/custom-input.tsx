import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '../../input'

const CustomInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-border bg-background px-3 py-2 text-base ring-offset-background transition-colors placeholder:text-xs placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
CustomInput.displayName = 'CustomInput'

export { CustomInput }
