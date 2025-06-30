import * as React from 'react'
import { CustomStatusFilter } from '@/shared/components'
import { CustomInput } from '@/components/ui/custom/custom-input'
import CommonDatePicker from '@/components/ui/custom/custom-date-picker/CommonDatePicker'
import { ActionButton } from '@/components/ui/custom/custom-button/action-button'
import { TransactionSearchModel } from '@/models/class/transaction/transaction.model'
import { CustomButton } from '@/components/ui/custom/custom-button/button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IProps {
  onSearch?: (filter: TransactionSearchModel) => void
  onReset?: () => void
  className?: string
}

export default function FilterBox(props: IProps) {
  const { onSearch, onReset, className } = props

  const [filter, setFilter] = React.useState<TransactionSearchModel>(new TransactionSearchModel())
  const originalFilter = React.useRef<TransactionSearchModel>(new TransactionSearchModel())

  const handleChangeFilter = (e: Partial<TransactionSearchModel>) => {
    setFilter((prev) => ({
      ...prev,
      ...e
    }))
  }

  const handleFilterDate = (e: [string, string]) => {
    setFilter((prev) => ({
      ...prev,
      from_date: e[0] || prev.from_date,
      to_date: e[1] || prev.to_date
    }))
  }

  const handleSearch = () => {
    console.log(filter)
  }

  const handleReset = () => {
    setFilter(new TransactionSearchModel())
  }

  const isFilterChanged = React.useMemo(() => {
    return JSON.stringify(filter) !== JSON.stringify(originalFilter?.current)
  }, [filter, originalFilter])

  return (
    <div className={cn('py-1 flex items-center gap-2 flex-wrap', className)}>
      <CustomInput
        placeholder='Search by transaction id/user name'
        className='w-[20rem]'
        value={filter.search}
        onChange={(e) => handleChangeFilter({ search: e.target.value })}
      />
      <CustomStatusFilter
        status={filter.status}
        onChange={(newStatusArray) => handleChangeFilter({ status: newStatusArray })}
      />
      <CommonDatePicker.RangeDateTime
        value={[filter.from_date, filter.to_date]}
        onChange={(e) => handleFilterDate(e?.value || [])}
      />

      {isFilterChanged && (
        <CustomButton variant='outline' className='border-dashed border-border' onClick={handleReset}>
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <X className='w-4 h-4' />
            Reset
          </div>
        </CustomButton>
      )}

      <ActionButton action='search' onClick={handleSearch}>
        Search
      </ActionButton>
    </div>
  )
}
