import { Status } from './Common'
import { SPORTS_COLORS } from './SportsColor'

export interface Selection {
  id?: string
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
  type: string
  selections: Selection[]
}

export interface TipResume {
  id: string
  name: string
  potentialReturn: number
  spent: number
  status: Status
  tipster: string
  type: string
  selections: Selection[]
  icon: string
  color: SPORTS_COLORS
  date: string
}

export type Balance = Pick<Tip, 'spent' | 'potentialReturn'>
export type CreateTip = Omit<Tip, 'id'>
