import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '../../input'

const CustomInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const isFilter = className?.includes('filter')
    const heightClass = isFilter ? 'h-7' : 'h-8'

    return (
      <Input
        type={type}
        className={cn(
          `flex ${heightClass} w-full rounded-md border border-border bg-background px-3 py-2 ring-offset-background transition-colors placeholder:text-xs placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-xs`,
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
