import { UTC_OPTIONS } from '@/constants/common'
import { cn } from '@/lib/utils'
import { SelectSearch, SelectSearchTrigger } from '@/components/ui/custom/custom-select/custom-select-search'
import { useUtc } from '@/context/app-config-provider'

interface SelectTimezoneProps {
  className?: string
  defaultValue?: string
  onChange?: (_value: string) => void
}

const SelectTimezone = (props: SelectTimezoneProps) => {
  const { utcOffset, setUtcOffset } = useUtc()
  const { className, onChange } = props

  const handleChange = (value: string) => {
    onChange?.(value)
    setUtcOffset(value)
  }

  return (
    <SelectSearch
      options={UTC_OPTIONS}
      value={utcOffset?.toString()}
      onChange={handleChange}
      className={cn('', className)}
    >
      {(props) => {
        return <SelectSearchTrigger {...props} />
      }}
    </SelectSearch>
  )
}

export default SelectTimezone
