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
