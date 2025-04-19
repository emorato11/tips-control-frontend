import type { YieldPayment } from './Payment'
import type { TipYield } from './Tip'

export interface Yield {
  tipsterId: string
  tipsterName: string
  tipsYield: number
  tips: TipYield[]
  totalPayments: number
  payments: YieldPayment[]
  countTipsByStatus: { won: number; failed: number; pending: number }
}

export interface YieldResume {
  tipsterId: string
  tipsterName: string
  yield: number
  paymentsYield: number
  tipsYield: number
}
