import { DateFilterType } from '@/types/Common'

export const MILLISECONDS_TO_SECONDS = 1000
export const DAY_SECONDS = 3600

export const CUSTOM_SHORT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short'
}

export const CUSTOM_SHORT_DATE_FORMAT_WITH_TIME: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: 'numeric'
}

export const CUSTOM_SHORT_DATE_FORMAT_WITH_YEAR: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
}

export const CUSTOM_LONG_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long'
}

export const CUSTOM_LONG_DATE_FORMAT_WITH_YEAR: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}

export const getParsedDate = (date: Date, options: Intl.DateTimeFormatOptions, language = 'es') => {
  const jsDate = new Date(date)
  return new Intl.DateTimeFormat(language, options).format(jsDate)
}

export const createDatesForFilter = (dates: Date | Date[], filterType: DateFilterType) => {
  if (filterType === DateFilterType.SINGLE && !Array.isArray(dates)) {
    return [
      new Date(dates.getFullYear(), dates.getMonth(), dates.getDate(), 0, 0),
      new Date(dates.getFullYear(), dates.getMonth(), dates.getDate(), 23, 59, 59)
    ]
  } else if (filterType === DateFilterType.WEEK && Array.isArray(dates)) {
    return dates
  } else if (filterType === DateFilterType.RANGE && Array.isArray(dates)) {
    const startDate = new Date(
      dates[0].getFullYear(),
      dates[0].getMonth(),
      dates[0].getDate(),
      0,
      0
    )

    const endDate = new Date(
      dates[1].getFullYear(),
      dates[1].getMonth(),
      dates[1].getDate(),
      23,
      59,
      59
    )
    return [startDate, endDate]
  } else {
    const monthDate = dates as unknown as { month: number; year: number }
    return [
      new Date(monthDate.year, monthDate.month, 1, 0, 0),
      new Date(monthDate.year, monthDate.month + 1, 0, 23, 59, 59)
    ]
  }
}

export const isSameMonth = (startDate: Date, endDate: Date) => {
  return (
    startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()
  )
}

export const isSameYear = (startDate: Date, endDate: Date) => {
  return startDate.getFullYear() === endDate.getFullYear()
}
