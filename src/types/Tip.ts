import { Status } from './Common'

export interface Selection {
  name: string
  status: Status
}

export interface Tip {
  date: Date
  id: string
  name: string
  potentialReturn: number
  spent: number
  status: Status
  tipster: string
  selections: Selection[]
}
