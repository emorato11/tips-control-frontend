import type { DateFilterType, Status } from './Common'

export interface Filters {
  tipster?: string | null
  date?: Date[]
  dateType?: DateFilterType
  status?: Status
  search?: string
}
