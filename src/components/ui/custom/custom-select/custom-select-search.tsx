import * as React from 'react'
import { CheckIcon, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { Dispatch, SetStateAction } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>

export type SelectOption = {
  value: string
  label: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
}

export interface SelectSearchProvided {
  options: SelectOption[]
  onChange?: (v: string) => void
  onFocus?: () => void
  placeholder: string
  clearable: boolean
  disabled: boolean
  selectedValue: string
  setSelectedValue: SetState<string>
  isPopoverOpen: boolean
  setIsPopoverOpen: SetState<boolean>
  onOptionSelect: (v: string) => void
  onClearAllOptions: () => void
}

export const SelectSearch: React.FC<{
  options: SelectOption[]
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  children: (v: SelectSearchProvided) => React.ReactNode
  isLoading?: boolean
}> = ({
  options,
  value = '',
  onChange,
  placeholder = 'Select...',
  clearable = false,
  disabled = false,
  className,
  children,
  isLoading = false,
  ...restProps
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(value)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const onOptionSelect = (option: string) => {
    if (onChange) {
      onChange(option)
    }
    setSelectedValue(option)
    setIsPopoverOpen(false)
  }

  const onClearAllOptions = () => {
    setSelectedValue('')
    onChange?.('')
    setIsPopoverOpen(false)
  }

  React.useEffect(() => {
    if (isPopoverOpen && value !== selectedValue) {
      setSelectedValue(value)
    }
  }, [isPopoverOpen])

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild className='text-xs'>
        {children({
          options,
          onChange,
          placeholder,
          clearable,
          disabled,
          selectedValue,
          setSelectedValue,
          isPopoverOpen,
          setIsPopoverOpen,
          onOptionSelect,
          onClearAllOptions
        })}
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-auto p-0', className)}
        align='start'
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
        {...restProps}
      >
        <Command>
          <CommandInput placeholder='Search...' style={{ backgroundColor: 'transparent' }} />
          <CommandList className='max-h-[unset] overflow-y-hidden'>
            {isLoading ? (
              <div className='flex items-center justify-center h-20 bg-background'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className={cn('animate-spin text-muted', className)}
                >
                  <path d='M21 12a9 9 0 1 1-6.219-8.56' />
                </svg>
              </div>
            ) : (
              <>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup className='max-h-[20rem] min-h-[10rem] overflow-y-auto'>
                  {options.map((option) => {
                    const isSelected = selectedValue === option.value
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => onOptionSelect(option.value)}
                        className='cursor-pointer'
                      >
                        <div
                          className={cn(
                            'mr-1 flex h-4 w-4 items-center justify-center',
                            isSelected ? 'text-primary' : 'invisible'
                          )}
                        >
                          <CheckIcon className='w-4 h-4' />
                        </div>
                        {option.icon && <option.icon className='w-4 h-4 mr-2 text-muted-foreground' />}
                        {option.label}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <div className='flex items-center justify-between'>
                    {selectedValue && clearable && (
                      <>
                        <CommandItem onSelect={onClearAllOptions} className='justify-center flex-1 cursor-pointer'>
                          Clear
                        </CommandItem>
                        <Separator orientation='vertical' className='flex h-full mx-2 min-h-6' />
                      </>
                    )}
                    <CommandItem
                      onSelect={() => setIsPopoverOpen(false)}
                      className='justify-center flex-1 max-w-full cursor-pointer'
                    >
                      Close
                    </CommandItem>
                  </div>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
SelectSearch.displayName = 'SelectSearch'

export const SelectSearchTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectSearchProvided & {
    className?: string
    children?: (v: SelectOption) => React.ReactNode
    style?: React.CSSProperties
    onChange?: (v: string) => void
  }
>(
  (
    {
      options,
      // onValueChange,
      placeholder,
      clearable,
      disabled,
      selectedValue,
      // setSelectedValue,
      // isPopoverOpen,
      setIsPopoverOpen,
      // onOptionSelect,
      onClearAllOptions,
      className,
      style,
      children
    },
    ref
  ) => {
    const onTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev)
    }

    return (
      <Button
        ref={ref}
        onClick={onTogglePopover}
        variant='outline'
        type='button'
        disabled={disabled}
        className={cn(
          'flex  w-full min-h-9 max-h-[36px] items-center justify-between  py-[4px] px-0 [&_svg]:pointer-events-auto ',
          'hover:bg-background border border-border rounded-sm ',
          disabled && '[&_svg]:pointer-events-none',
          'shrink-1',
          className
        )}
        style={style}
      >
        {selectedValue ? (
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-wrap items-center px-2'>
              {[selectedValue].map((value, index) => {
                const option = options.find((o) => o.value === value)

                if (!option) {
                  return <div key={`${index}-${value}`}></div>
                }

                if (children) {
                  return <div key={`${index}-${value}`}>{children(option)}</div>
                }

                return (
                  <div key={`${index}-${value}`} className={cn('text-foreground text-xs')}>
                    {option?.icon && <option.icon className='mr-1 h-3.5 w-3.5' />}
                    {option?.label}
                  </div>
                )
              })}
            </div>
            <div className='flex items-center justify-between'>
              {selectedValue && clearable && (
                <>
                  <X
                    className={cn('mx-1 h-4 cursor-pointer text-muted-foreground')}
                    onClick={(e) => {
                      e.stopPropagation()
                      onClearAllOptions()
                    }}
                  />
                  <Separator orientation='vertical' className='flex h-full min-h-6' />
                </>
              )}
              <ChevronDown className='h-4 mx-1 cursor-pointer text-muted-foreground' />
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between w-full mx-auto'>
            <span className='mx-3 text-sm text-muted-foreground'>{placeholder}</span>
            <ChevronDown className='h-4 mx-1 cursor-pointer text-muted-foreground' />
          </div>
        )}
      </Button>
    )
  }
)
SelectSearchTrigger.displayName = 'SelectSearchTrigger'
