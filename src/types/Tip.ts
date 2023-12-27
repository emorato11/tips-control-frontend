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
  date: string
}

export type Balance = Pick<Tip, 'spent' | 'potentialReturn'>
export type CreateTip = Omit<Tip, 'id'>
