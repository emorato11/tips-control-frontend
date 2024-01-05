import type { SportsAssets } from './Common'
import { Sports } from './Sports'

export interface Tipster extends SportsAssets {
  id: string
  name: string
  description: string
  type: Sports
}

export type CreateTipster = Omit<Tipster, 'id' | 'icon' | 'color'>
