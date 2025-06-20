import { FORMAT_DATE } from '@/constants/format-date'
import { useUtc } from '@/context/app-config-provider'
import { DateTimeHelper } from '@/lib/date-time-helper'

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

  const formatted = DateTimeHelper.formatWithUtcOffset(date, format, utcOffset, 'hour')

  return <span className={className}>{formatted}</span>
}
