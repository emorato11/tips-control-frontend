import {
  mdiBasketball,
  mdiTennisBall,
  mdiSoccer,
  mdiAmpersand,
  mdiVolleyball,
  mdiGamepadVariant,
  mdiBell
} from '@mdi/js'

import { Sports, SPORTS_COLORS } from '@/types/Sports'
import type { TipResume } from '@/types/Tip'
import { getParsedDate } from '@/utils/date'
import { Status } from '@/types/Common'
import { roundDecimals } from '@/utils/number'

export const TIP_TYPE_SELECTIONS: { name: string; value: string }[] = [
  { name: 'Free', value: 'free' },
  { name: 'Premium', value: 'premium' },
  { name: 'Grupo', value: 'group' },
  { name: 'De Pago', value: 'pay' }
]

export const getSportAssets = (sport: Sports) => {
  if (sport === Sports.BASKETBALL) {
    return { icon: mdiBasketball, color: SPORTS_COLORS.basketball }
  }
  if (sport === Sports.TENNIS) {
    return { icon: mdiTennisBall, color: SPORTS_COLORS.tennis }
  }
  if (sport === Sports.FOOTBALL) {
    return { icon: mdiSoccer, color: SPORTS_COLORS.football }
  }
  if (sport === Sports.VOLLEY) {
    return { icon: mdiVolleyball, color: SPORTS_COLORS.volleyball }
  }

  if (sport === Sports.ESPORTS) {
    return { icon: mdiGamepadVariant, color: SPORTS_COLORS.volleyball }
  }

  if (sport === Sports.MULTI) {
    return { icon: mdiAmpersand, color: SPORTS_COLORS.multi }
  }

  return { icon: mdiBell, color: SPORTS_COLORS.default }
}

export const convertTipsToGraphicData = (tips: TipResume[]) => {
  return tips
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((accum: { time: string; value: number }[], current) => {
      const time: string = getParsedDate(current.date, {}, 'en-CA')

      const quantity =
        current.status === Status.WON
          ? current.potentialReturn - current.spent
          : current.status === Status.PENDING || current.status === Status.CANCELED
            ? 0
            : current.spent * -1

      if (!accum[accum.length - 1] || accum[accum.length - 1].time !== time) {
        const lastQuantity = accum[accum.length - 1]?.value || 0
        accum = [...accum, { time, value: quantity + lastQuantity }]
      } else {
        accum[accum.length - 1].value += roundDecimals(quantity)
      }

      return accum
    }, [])
}
