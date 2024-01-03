import { Status } from './Common'

export interface Filters {
  tipster?: string | null
  date?: Date[]
  status?: Status
}
