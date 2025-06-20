import { cn } from '@/lib/utils'
import { usePagination } from '@mantine/hooks'
import { useContext } from 'react'
import { PAGINATION } from '@/constants/paginations'
import { DataTableContext } from '@/context/data-table.provider'
import { CustomSelect } from '../custom-select/custom-select'

interface PaginationProps {
  classNameContainer?: string
  totalItems?: number
  totalPages?: number
}

function CustomPagination({ classNameContainer, totalItems = 100, totalPages }: PaginationProps) {
  const { paramSearch, onTableChange } = useContext(DataTableContext)
  const { limit, page } = paramSearch

  const totalPage = totalPages || 0

  const {
    range,
    setPage,
    active: activeFromHook
  } = usePagination({
    total: totalPage,
    onChange: (page) =>
      onTableChange({
        ...paramSearch,
        page: page,
        offset: (page - 1) * limit
      }),
    siblings: 0
  })

  const active = activeFromHook === 0 ? 1 : activeFromHook

  const handleChangeItemPerPage = (newItemPerPage: string) => {
    const newLimit = +newItemPerPage
    const estimatedOffset = (page - 1) * limit
    const estimatedPage = Math.floor(estimatedOffset / newLimit) + 1
    const newPage = Math.min(Math.max(estimatedPage, 1), totalPage) // Đảm bảo newPage nằm trong 1..totalPage

    setPage(newPage)
    onTableChange({
      ...paramSearch,
      limit: newLimit,
      page: estimatedPage,
      offset: estimatedOffset
    })
  }

  const btnClass = (disabled: boolean) =>
    cn(
      'px-2 rounded-xs text-white font-medium cursor-pointer text-xs py-1 px-2 bg-background shadow-sm text-black transition-opacity duration-200 rounded-sm',
      disabled ? 'opacity-30' : ' hover:opacity-70'
    )

  return (
    <div className='flex items-center justify-center gap-5 mt-10 flex-wrap text-xs'>
      <div className={cn('flex justify-center', classNameContainer)}>
        <div className='flex gap-2 select-none flex-wrap'>
          <button className={btnClass(page <= 1)} disabled={page <= 1} onClick={() => setPage(1)}>
            {'<<'}
          </button>
          <button className={btnClass(page <= 1)} disabled={page <= 1} onClick={() => setPage(page - 1)}>
            {'|<'}
          </button>

          {range.map((page) => {
            if (page === 'dots') {1
              return <span key='dots'>...</span>
            }
            return (
              <button
                key={page}
                onClick={() => {
                  setPage(page)
                }}
                className={cn(
                  'px-3 rounded-xs text-white font-medium cursor-pointer hover:opacity-85 text-md rounded-sm transition-colors duration-200',
                  active === page ? 'bg-[black]/80' : 'text-black'
                )}
              >
                {page}
              </button>
            )
          })}

          <button
            className={btnClass(page >= totalPage)}
            disabled={page >= totalPage}
            onClick={() => setPage(page + 1)}
          >
            {'>|'}
          </button>
          <button
            className={btnClass(page >= totalPage)}
            disabled={page >= totalPage}
            onClick={() => setPage(totalPage)}
          >
            {'>>'}
          </button>
        </div>
      </div>

      <CustomSelect
        onValueChange={handleChangeItemPerPage}
        value={limit.toString()}
        options={PAGINATION.ITEM_PER_PAGE.map((item) => ({
          value: item.toString(),
          label: item.toString()
        }))}
        className='w-[80px] rounded-md'
        placeholder='Per page'
      />
    </div>
  )
}

export default CustomPagination
