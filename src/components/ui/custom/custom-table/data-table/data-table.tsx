import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  Row,
  useReactTable
} from '@tanstack/react-table'
import React, { CSSProperties, Fragment, useEffect, useState } from 'react'
// import CustomPagination from "../custom-pagination/custom-pagination";
import { DataTableProvider } from '@/context/data-table.provider'
import { Table } from '../main-table'
import TableDataCellHeader from '../table-data-cell-header'
import CustomPagination from '../../custom-pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { BaseSearchModel } from '@/models/class/search/base-search-model'
import { UseSort } from '@/hooks/use-sort'
import { TableHeaderProvider } from '@/context/table-header.provider'
import Empty from '@/components/ui/empty/empty'

interface IDataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  paramSearch?: BaseSearchModel
  onTableChange?: (value: Partial<BaseSearchModel>) => void
  loading?: boolean
  isDynamic?: boolean
  getRowCanExpand?: (row: Row<T>) => boolean
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement
  totalItem?: number
  totalPages?: number
  wrapperClassName?: string
  isShowPagination?: boolean
}

function DataTable<T>(props: IDataTableProps<T>) {
  const {
    columns: externalColumns,
    data: externalData,
    paramSearch,
    onTableChange,
    loading,
    isDynamic,
    getRowCanExpand,
    renderSubComponent,
    wrapperClassName,
    isShowPagination = true
  } = props

  const { sorting, setSorting, keySort, sortType } = UseSort()

  const [internalData, setInternalData] = useState<T[]>(externalData || [])

  // const columns: ColumnDef<T>[] = React.useMemo(() => {
  //   if (!isDynamic) return externalColumns

  //   return [
  //     ...externalColumns,
  //     {
  //       id: 'external-action',
  //       header: '',
  //       size: 70,
  //       cell: ({ row }) => (
  //         <div className='flex justify-center'>
  //           <ButtonRemove onClick={() => handleRemoveRow(row.index)} className='hover:underline text-xs' />
  //         </div>
  //       )
  //     }
  //   ]
  // }, [externalColumns, isDynamic])

  const useTable = useReactTable({
    columns: externalColumns,
    data: internalData,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    sortDescFirst: true,
    state: {
      sorting
    },
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: getRowCanExpand
  })

  const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
    const isPinned = column.getIsPinned()
    const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
    const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')

    return {
      boxShadow: isLastLeftPinnedColumn
        ? '-4px 0 4px -4px gray inset'
        : isFirstRightPinnedColumn
          ? '4px 0 4px -4px gray inset'
          : undefined,
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      opacity: isPinned ? 0.97 : 1,
      position: isPinned ? 'sticky' : 'relative',
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
      backgroundColor: isPinned ? 'white' : ''
    }
  }

  const columnSizeVars = React.useMemo(() => {
    const headers = useTable.getFlatHeaders()
    const colSize: { [key: string]: string } = {}
    const totalColumns = headers.length
    const containerWidth = 100 // 100% of parent container

    headers.forEach((header) => {
      const columnSize = header.getSize()
      // If no size specified, distribute remaining space equally
      if (!columnSize) {
        const defaultWidth = Math.max(150, containerWidth / totalColumns)
        colSize[`--col-size-${header.id}`] = `${defaultWidth}px`
      } else {
        colSize[`--col-size-${header.id}`] = `${columnSize}px`
      }
    })
    return colSize
  }, [useTable.getState().columnSizingInfo, useTable.getState().columnSizing, useTable.getState().columnVisibility])

  useEffect(() => {
    onTableChange?.({
      keySort,
      sortType
    })
  }, [keySort, sortType])

  useEffect(() => {
    setInternalData(externalData || [])
  }, [externalData])

  const handleAddRow = () => {
    const emptyRow = {} as T
    setInternalData((prev) => [...prev, emptyRow])
  }

  const handleRemoveRow = (index: number) => {
    setInternalData((prev) => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
    useTable.getAllLeafColumns().forEach((column) => {
      const meta = column.columnDef.meta
      if (meta?.isPinned === 'left') {
        column.pin('left')
      } else if (meta?.isPinned === 'right') {
        column.pin('right')
      }
    })
  }, [useTable])

  return (
    <>
      <DataTableProvider useTable={useTable} paramSearch={paramSearch} onTableChange={onTableChange}>
        <div style={{ ...columnSizeVars }} className={cn('w-full overflow-y-auto  max-h-[700px] bg-surface border-t border-border', wrapperClassName)}>
          <Table className='w-full min-w-full'>
            <Table.Head className='sticky top-0 z-20 bg-white'>
              {useTable.getHeaderGroups().map((headerGroup) => {
                return (
                  <Table.Row key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const memoizedHeaderProvider = React.useMemo(() => {
                        const isGroup = header.subHeaders?.length > 1
                        const { meta } = header.column.columnDef

                        return (
                          <TableHeaderProvider header={header} key={header.id}>
                            <Table.Header
                              colSpan={header.colSpan}
                              style={{
                                width: `var(--col-size-${header.id})`,
                                minWidth: `var(--col-size-${header.id})`,
                                ...getCommonPinningStyles(header.column)
                              }}
                              className={cn('relative', `${isGroup ? meta?.className_header_group || '' : ''}`)}
                            >
                              {header.isPlaceholder ? null : <TableDataCellHeader />}
                            </Table.Header>
                          </TableHeaderProvider>
                        )
                      }, [{ ...header }])
                      return memoizedHeaderProvider
                    })}
                  </Table.Row>
                )
              })}
            </Table.Head>
            <Table.Body>
              {loading ? (
                // Render skeleton rows when loading
                Array.from({ length: 5 }).map((_, rowIndex) => (
                  <Table.Row key={rowIndex}>
                    {useTable.getFlatHeaders().map((header, cellIndex) => (
                      <Table.Cell
                        key={cellIndex}
                        style={{
                          width: `var(--col-size-${header.id})`,
                          minWidth: `var(--col-size-${header.id})`,
                          ...getCommonPinningStyles(header.column)
                        }}
                        className='px-2 border-b border-x border-border text-sm'
                      >
                        <Skeleton className='h-4 w-full' />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              ) : !useTable.getRowModel().rows.length ? (
                <Table.Row>
                  <Table.Cell colSpan={useTable.getFlatHeaders().length}>
                    <Empty />
                  </Table.Cell>
                </Table.Row>
              ) : (
                useTable.getRowModel().rows.map((row) => {
                  return (
                    <Fragment key={row.id}>
                      <Table.Row key={row.id} className=''>
                        {row.getVisibleCells().map((cell) => (
                          <Table.Cell
                            key={cell.id}
                            style={{
                              width: `var(--col-size-${cell.column.id})`,
                              minWidth: `var(--col-size-${cell.column.id})`,
                              ...getCommonPinningStyles(cell.column)
                            }}
                            className='border-b border-x border-border text-xs truncate px-4'
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Table.Cell>
                        ))}
                      </Table.Row>
                      {row.getIsExpanded() && (
                        <Table.Row>
                          {/* 2nd row is a custom 1 cell row */}
                          <Table.Cell colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</Table.Cell>
                        </Table.Row>
                      )}
                    </Fragment>
                  )
                })
              )}
            </Table.Body>
          </Table>
          {isDynamic && (
            <div className='w-full flex justify-end p-4'>
              <tfoot>
                <tr className='flex justify-end'>
                  <th align='right'>
                    <button onClick={handleAddRow} className='px-2 py-1 text-sm border rounded hover:bg-gray-100'>
                      Add Row
                    </button>
                  </th>
                </tr>
              </tfoot>
            </div>
          )}
        </div>
        {isShowPagination && <CustomPagination totalItems={props.totalItem} totalPages={props.totalPages} />}
      </DataTableProvider>
    </>
  )
}

export default DataTable
