import type { SportsAssets, Status } from './Common'
import type { Sports } from './Sports'

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
  tipsterId: string
  tipsterName: string
  type: Sports
  selections: Selection[]
}

export interface TipResume extends SportsAssets {
  id: string
  name: string
  potentialReturn: number
  spent: number
  status: Status
  tipsterId: string
  tipsterName: string
  type: string
  selections: Selection[]
  date: Date
  parsedDate: string
}

export type TipYield = Omit<Tip, 'potentialReturn' | 'spent' | 'selections'> & { returned: number }

export type Balance = Pick<Tip, 'spent' | 'potentialReturn'> & { pending: number }
export type CreateTip = Omit<Tip, 'id'>
