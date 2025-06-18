import { TableHeaderContext } from '@/context/table-header.provider'
import { cn } from '@/lib/utils'
import { flexRender } from '@tanstack/react-table'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useContext } from 'react'

interface IProps<T> {
  classNameContainer?: string
  classNameContent?: string
}
function TableDataCellHeader<T>(props: IProps<T>) {
  1
  const { header } = useContext(TableHeaderContext)
  const { column } = header

  const { classNameContainer, classNameContent } = props
  const { meta } = column.columnDef

  const contentHeader = flexRender(column.columnDef.header, header.getContext())

  return (
    <>
      <div className={cn('flex items-center gap-2', classNameContainer)}>
        <div className='flex-1 flex justify-center'>
          <span className={cn('truncate', classNameContent)}>{contentHeader}</span>
        </div>
        <div onClick={column.getToggleSortingHandler()} className='cursor-pointer'>
          {meta?.sorter &&
            (meta?.iconSort ? (
              typeof meta?.iconSort === 'function' ? (
                meta.iconSort(header)
              ) : (
                React.cloneElement(meta.iconSort, {
                  header
                })
              )
            ) : (
              <div className=''>
                <ChevronUp
                  className={cn(
                    'h-3.5 w-3.5',
                    column.getIsSorted() === 'asc' ? 'text-accent-foreground font-bold' : 'text-muted-foreground'
                  )}
                />
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5',
                    column.getIsSorted() === 'desc' ? 'text-accent-foreground font-bold' : 'text-muted-foreground'
                  )}
                />
              </div>
            ))}
        </div>
      </div>
      {header.column.getCanResize() && (
        <div
          onDoubleClick={() => header.column.resetSize()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={cn(
            'absolute top-0 h-full w-1 cursor-col-resize select-none touch-none right-0 z-10 flex justify-center bg-[rgba(0,_0,_0,_0.5)] opacity-0 hover:opacity-100'
            // "before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px"
          )}
        />
      )}
    </>
  )
}

export default TableDataCellHeader
