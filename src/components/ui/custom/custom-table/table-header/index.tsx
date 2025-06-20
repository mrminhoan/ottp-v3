import { cn } from '@/lib/utils'
import React from 'react'

export const TableHeader = React.forwardRef<
  HTMLTableCellElement,
  React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>
>((props, ref) => {
  const { className, children, ...rest } = props
  return (
    <th
      className={cn(' py-2 px-2 font-bold text-xs hover:text-black border-x border-border', className)}
      {...rest}
      ref={ref}
    >
      {children}
    </th>
  )
})
