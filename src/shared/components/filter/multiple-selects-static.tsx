import { motion } from 'motion/react'
import { FunnelPlus, X } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/animate-ui/radix/dropdown-menu'
import { Separator } from '@/components/ui/separator'

export interface SelectOption<T = string> {
  value: T
  label: string
  disabled?: boolean
}

interface IProps<T = string> {
  label: string
  placeholder?: string
  options: SelectOption<T>[]
  selectedValues: T[]
  onChange: (values: T[]) => void
  maxDisplayedItems?: number
  className?: string
  showClearAll?: boolean
}

export const MultipleSelectStatic = <T extends string | number>({
  label,
  placeholder = 'Select items',
  options,
  selectedValues,
  onChange,
  maxDisplayedItems = 3,
  className = '',
  showClearAll = true
}: IProps<T>) => {
  const isChecked = (value: T) => selectedValues.includes(value)

  const toggleChecked = (value: T) => (checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value])
    } else {
      onChange(selectedValues.filter((v) => v !== value))
    }
  }

  const clearAll = () => {
    onChange([])
  }


  const getDisplayedItems = () => {
    const items = selectedValues.slice(0, maxDisplayedItems)
    const remaining = selectedValues.length - maxDisplayedItems
    return { items, remaining }
  }



  const { items: displayedItems, remaining } = getDisplayedItems()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`text-sm text-muted-foreground w-fit border border-dashed border-border rounded-md h-8 flex items-center justify-center px-3 ${className}`}
        >
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center gap-2'>
            <div className='flex items-center gap-2 px-2'>
              <FunnelPlus className='w-3 h-3' />
              {selectedValues.length > 0 ? label : placeholder}
            </div>
            {selectedValues.length > 0 && (
              <div className='flex items-center gap-2'>
                <Separator orientation='vertical' className='h-5 bg-muted-foreground' />
                <div className='flex items-center gap-1'>
                  {displayedItems.map((value) => {
                    const option = options.find((opt) => opt.value === value)
                    const displayLabel = option?.label || String(value)
                    return (
                      <div
                        key={String(value)}
                        className='bg-muted-foreground text-xs text-white px-2 rounded-md h-5 flex items-center justify-center gap-1 group'
                      >
                        <span className='capitalize'>{displayLabel}</span>
                      </div>
                    )
                  })}
                  {remaining > 0 && (
                    <div className='bg-muted-foreground text-xs text-white px-2 rounded-md h-5 flex items-center justify-center'>
                      +{remaining}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56'>
        <div className='flex items-center justify-between px-2 py-1'>
          <DropdownMenuLabel className='p-0'>{label}</DropdownMenuLabel>
          {showClearAll && selectedValues.length > 0 && (
            <button
              onClick={clearAll}
              className='text-xs text-muted-foreground hover:text-foreground transition-colors'
            >
              Clear all
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={String(option.value)}
            checked={isChecked(option.value)}
            onCheckedChange={toggleChecked(option.value)}
            disabled={option.disabled}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        {options.length === 0 && <div className='px-2 py-2 text-sm text-muted-foreground'>No options available</div>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
