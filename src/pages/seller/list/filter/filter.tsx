import { CustomInput } from '@/components/ui/custom/custom-input'
import { BANK_TYPE, BANK_TYPE_OPTIONS } from '@/constants/common'
import { SellerSearchModel } from '@/models/class/seller/seller.model'
import { MinMaxFilter, MinMaxValue, MultipleSelectStatic } from '@/shared/components'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { CustomButton } from '@/components/ui/custom/custom-button/button'
import { X } from 'lucide-react'
import { ActionButton } from '@/components/ui/custom/custom-button/action-button'

interface IProps {
  onSearch?: (filter: SellerSearchModel) => void
  onReset?: () => void
  className?: string
}

export default function FilterBox(props: IProps) {
  const { onSearch, onReset, className } = props

  const [filter, setFilter] = useState<SellerSearchModel>(new SellerSearchModel())
  const [selectedBankType, setSelectedBankType] = useState<BANK_TYPE[]>([])
  const [priceRange, setPriceRange] = useState<MinMaxValue>({ min: undefined, max: undefined })
  const [search, setSearch] = useState('')

  const handleReset = () => {
    setSelectedBankType([])
    setPriceRange({ min: undefined, max: undefined })
    setSearch('')
    setFilter(new SellerSearchModel())
    onReset?.()
  }

  const handleChangePaymentType = (newPaymentTypeArray: BANK_TYPE[]) => {
    console.log(newPaymentTypeArray)
    setSelectedBankType(newPaymentTypeArray)
  }
  const handleChangePriceRange = (newPriceRange: MinMaxValue) => {
    setPriceRange(newPriceRange)
  }

  const handleSearch = () => {
    setFilter((prev) => ({
      ...prev,
      payment_type: selectedBankType,
      min_tether: priceRange.min || 0,
      max_tether: priceRange.max || 0,
      search: search
    }))
  }

  // Logic để kiểm tra trạng thái disable của reset button
  const isResetDisabled = () => {
    return selectedBankType.length === 0 && !priceRange.min && !priceRange.max && !search.trim()
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <MultipleSelectStatic
        label='Payment'
        placeholder='Select payment'
        options={BANK_TYPE_OPTIONS}
        selectedValues={selectedBankType}
        onChange={handleChangePaymentType}
        maxDisplayedItems={3}
      />
      <MinMaxFilter
        label='Price'
        placeholder='Select price range'
        value={priceRange}
        onChange={handleChangePriceRange}
        minPlaceholder='Min Price'
        maxPlaceholder='Max Price'
        // prefix='T'
        decimalScale={2}
      />
      <CustomInput
        placeholder='Search by transaction id/user name'
        className='w-[20rem] placeholder:text-sm'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <CustomButton
        variant='outline'
        className='border-dashed border-border'
        onClick={handleReset}
        disabled={isResetDisabled()}
      >
        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
          <X className='w-4 h-4' />
          Reset
        </div>
      </CustomButton>

      <ActionButton action='search' onClick={handleSearch}>
        Search
      </ActionButton>
    </div>
  )
}
