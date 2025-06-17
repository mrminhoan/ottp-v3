import { ReactNode } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import { ChevronDownIcon } from 'lucide-react'

interface IOption {
  value: string
  label: string | ReactNode
}

interface IProps {
  options: IOption[]
  value: string
  onChange: (value: string | number | null) => void
  placeholder?: string
  className?: string
  classNameTrigger?: string
  classNameContent?: string
  classNameItem?: string
  disabled?: boolean
  isSearchable?: boolean
  isClearable?: boolean
  children?: ReactNode
  allowClear?: boolean
  onValueChange?: (value: string) => void
}

export const CustomSelect = (props: IProps) => {
  const {
    options,
    value,
    // onChange,
    placeholder,
    className,
    classNameTrigger,
    classNameContent,
    classNameItem,
    disabled = false,
    allowClear = false,
    onValueChange
  } = props
  return (
    <div className={cn('', className)}>
      <Select onValueChange={onValueChange} value={value} disabled={disabled} defaultValue={value}>
        <div
          className={cn(
            'min-w-[5rem] h-9 flex items-center justify-between gap-2 border border-border rounded-xs outline-none',
            className
          )}
        >
          <SelectTrigger
            className={cn('w-full border-none shadow-none outline-none', classNameTrigger)}
            disabled={disabled}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          {allowClear && value ? (
            <XIcon
              className='w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground'
              //   onClick={() => onChange(null)}
            />
          ) : (
            <ChevronDownIcon className='w-4 h-4' />
          )}
        </div>
        <SelectContent className={cn('', classNameContent)}>
          {options.map((option) => (
            <SelectItem key={option?.value} value={option?.value} className={cn('', classNameItem)}>
              {option?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
