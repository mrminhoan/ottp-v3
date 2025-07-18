import { FORMAT_DATE } from '@/constants/format-date'
import { useUtc } from '@/context/app-config-provider'
import { DateTimeHelper } from '@/lib/date-time-helper'
import { cn } from '@/lib/utils'

type TDate = Date | string
type Props = {
  date: TDate
  format?: string
  fallback?: React.ReactNode
  className?: string
}

export const CustomDateTime = (props: Props) => {
  const { date, format = FORMAT_DATE.YYYY_MM_DD_HH_mm_ss, fallback, className } = props
  const { utcOffset } = useUtc()

  if (!date) return <span className={className}>{fallback}</span>

  const fullFormatted = DateTimeHelper.formatWithUtcOffset(date, format, utcOffset, 'hour')

  const [ymd, timeWithUtc] = fullFormatted.split(' ')
  const time = timeWithUtc?.match(/\d{2}:\d{2}:\d{2}/)?.[0]
  const utc = timeWithUtc?.replace(time ?? '', '').trim()

  return (
    <div className={cn('flex  gap-1 item-center', className)}>
      <span className='font-medium text-xs'>{ymd}</span>
      <div>
        <span className='font-light text-[10px]'>({time} </span>
        <span className='font-light text-[10px]'>UTC {utcOffset})</span>
      </div>
    </div>
  )
}
