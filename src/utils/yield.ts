import type { TipYield } from '@/types/Tip'
import { getParsedDate } from '@/utils/date'
import { roundDecimals } from '@/utils/number'
import type { YieldPayment } from '@/types/Payment'

export const convertYieldToGraphicData = ({
  tips,
  payments
}: {
  tips: TipYield[]
  payments: YieldPayment[]
}) => {
  const mappedTips = tips.map((tip) => ({ time: tip.date, value: tip.returned }))
  const mappedPayments = payments.map((payment) => ({
    time: payment.date,
    value: payment.spent * -1
  }))

  return [...mappedTips, ...mappedPayments]
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    .reduce((accum: { time: string; value: number }[], current) => {
      const time: string = getParsedDate(current.time, {}, 'en-CA')

      if (!accum[accum.length - 1] || accum[accum.length - 1].time !== time) {
        const lastQuantity = accum[accum.length - 1]?.value || 0
        accum = [...accum, { time, value: current.value + lastQuantity }]
      } else {
        accum[accum.length - 1].value += roundDecimals(current.value)
      }

      return accum
    }, [])
}
