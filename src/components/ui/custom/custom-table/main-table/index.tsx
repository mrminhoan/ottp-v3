import { cn } from '@/lib/utils'
import React from 'react'

import { TableBody } from '../table-body'
import { TableCell } from '../table-cell'
import { TableRow } from '../table-row'
import { TableHead } from '../table-head'
import { TableHeader } from '../table-header'

interface ITableProps extends React.HTMLProps<HTMLTableElement> {
  classNameContainer?: string
  className?: string
}
const Table = React.forwardRef<HTMLTableElement, ITableProps>((props, ref) => {
  const { classNameContainer, className, children, ...rest } = props
  return (
    // overflow-x-auto
    <div className={cn('max-w-full w-full', classNameContainer)}>
      <table ref={ref} {...rest} className={cn('w-max', className)}>
        {children}
      </table>
    </div>
  )
}) as React.ForwardRefExoticComponent<ITableProps & React.RefAttributes<HTMLTableElement>> & {
  Row: typeof TableRow
  Head: typeof TableHead
  Header: typeof TableHeader
  Body: typeof TableBody
  Cell: typeof TableCell
}

Table.displayName = 'Table'

Table.Row = TableRow
Table.Head = TableHead
Table.Header = TableHeader
Table.Body = TableBody
Table.Cell = TableCell

export { Table }
