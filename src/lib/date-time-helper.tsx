import { FORMAT_DATE } from '@/constants/format-date'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

type TDate = Date | Dayjs | string
dayjs.extend(utc)
dayjs.extend(tz)

const wrapperInValidTime = (cb: Function) => {
  try {
    return cb?.()
  } catch (e) {
    console.error(e)
    return ''
  }
}

const getUtcOffset = (): string => {
  const utcOffset = localStorage.getItem('utc')
  return utcOffset
}

const getTimezone = (): string => {
  return 'Asia/Singapore'
}

const convertISOToFormat = (isoDateTime: TDate, toFormat: string, timezone = getTimezone()): string => {
  return dayjs(isoDateTime).tz(timezone).format(toFormat)
}

const formatWithUtcOffset = (
  date: TDate,
  toFormat: string = FORMAT_DATE.YYYY_MM_DD_HH_mm_ss,
  utc: string = getUtcOffset(),
  unit: ManipulateType = 'hour'
): string => {
  return wrapperInValidTime(() => {
    return dayjs(date).utc().add(Number(utc), unit).format(toFormat)
  })
}

// Convert string from server to Response
const covertStringToDayjs = (date: Date | string, timezone = getTimezone()) => {
  if (!date) {
    return null
  }
  return wrapperInValidTime(() => {
    return dayjs(date).tz(timezone)
  })
}

// Format date base to Request
const formatBase = (date: string, formatDate = FORMAT_DATE.DD_MMMM_YYYY_AT_h_mm_a) => {
  return wrapperInValidTime(() => {
    return `${DateTimeHelper.convertISOToFormat(date, formatDate)}`
  })
}

const getTodayWithUtcOffset = (): Dayjs => {
  const offset = Number(getUtcOffset() || 0)
  return dayjs().utc().add(offset, 'hour').startOf('day')
}

const getOneWeekAgoWithUtcOffset = (): Dayjs => {
  const offset = Number(getUtcOffset() || 0)
  return dayjs().utc().add(offset, 'hour').subtract(7, 'day').startOf('day')
}

const getTodayWithUtcOffsetFormatted = (format = FORMAT_DATE.YYYY_MM_DD_HH_mm): string => {
  return getTodayWithUtcOffset().format(format)
}

const getOneWeekAgoWithUtcOffsetFormatted = (format = FORMAT_DATE.YYYY_MM_DD_HH_mm): string => {
  return getOneWeekAgoWithUtcOffset().format(format)
}
export const DateTimeHelper = {
  convertISOToFormat,
  covertStringToDayjs,
  formatBase,
  formatWithUtcOffset,
  getTodayWithUtcOffset,
  getOneWeekAgoWithUtcOffset,
  getTodayWithUtcOffsetFormatted,
  getOneWeekAgoWithUtcOffsetFormatted
}
