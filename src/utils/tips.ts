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

// Mover a utils
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
