import { DateFilterType } from '@/types/Common'

export const CUSTOM_SHORT_DATE_FORMAT = {
  day: '2-digit',
  month: 'short'
}

export const CUSTOM_LONG_DATE_FORMAT = {
  day: '2-digit',
  month: 'long'
}

export const getParsedDate = (date: Date, options = {}) => {
  const jsDate = new Date(date)
  return new Intl.DateTimeFormat('es', options).format(jsDate)
}

export const createDatesForFilter = (dates: Date | Date[], filterType: DateFilterType) => {
  if (filterType === DateFilterType.SINGLE && !Array.isArray(dates)) {
    return [
      new Date(dates.getFullYear(), dates.getMonth(), dates.getDate(), 0, 0),
      new Date(dates.getFullYear(), dates.getMonth(), dates.getDate() + 1, 0, 0)
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
      dates[1].getDate() + 1,
      0,
      0
    )
    return [startDate, endDate]
  } else {
    const monthDate = dates as unknown as { month: number; year: number }
    return [
      new Date(monthDate.year, monthDate.month, 1, 0, 0),
      new Date(monthDate.year, monthDate.month + 1, 1, 0, 0)
    ]
  }
}
