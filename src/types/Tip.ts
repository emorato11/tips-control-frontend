import type { SportsAssets, Status } from './Common'

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

export interface TipResume extends SportsAssets {
  id: string
  name: string
  potentialReturn: number
  spent: number
  status: Status
  tipster: string
  type: string
  selections: Selection[]
  date: Date
  parsedDate: string
}

export type Balance = Pick<Tip, 'spent' | 'potentialReturn'> & { pending: number }
export type CreateTip = Omit<Tip, 'id'>
