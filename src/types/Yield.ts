import type { YieldPayment } from './Payment'

export interface Yield {
  tipsterId: string
  tipsterName: string
  tipsYield: number
  payments: YieldPayment[]
  countTipsByStatus: { won: number; failed: number; pending: number }
}

export interface YieldResume {
  tipsterId: string
  tipsterName: string
  yield: number
}
