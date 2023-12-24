export const getParsedDate = (date: Date) => {
  const jsDate = new Date(date)
  return new Intl.DateTimeFormat('es').format(jsDate)
}
