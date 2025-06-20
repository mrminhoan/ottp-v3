import { cn } from '@/lib/utils'
import React from 'react'

interface ITableHeadProps extends React.HtmlHTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export const TableHead = React.forwardRef<HTMLTableSectionElement, ITableHeadProps>((props, ref) => {
  const { className, children, ...rest } = props
  return (
    <thead
      ref={ref}
      className={cn('w-full text-muted-foreground bg-background overflow-hidden text-center shadow-md max-h-1 border-b border-border', className)}
      {...rest}
    >
      {children}
    </thead>
  )
})
