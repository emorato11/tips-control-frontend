import { SportsAssets } from './Common'

export interface Tipster extends SportsAssets {
  id: string
  name: string
  description: string
  type: string
}

export type CreateTipster = Omit<Tipster, 'id' | 'icon' | 'color'>
