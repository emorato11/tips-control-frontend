import { SPORTS_COLORS } from './Sports'

export interface SportsAssets {
  icon: string
  color: SPORTS_COLORS
}

export enum Status {
  PENDING = 'pending',
  WON = 'won',
  FAILED = 'failed'
}

export enum DateFilterType {
  SINGLE = 'single',
  WEEK = 'week',
  MONTH = 'month',
  RANGE = 'range'
}
