import {
  mdiBasketball,
  mdiTennisBall,
  mdiSoccer,
  mdiAmpersand,
  mdiVolleyball,
  mdiBell
} from '@mdi/js'

import { SPORTS_COLORS } from '@/types/Sports'

// Mover a utils
export const getSportAssets = (sport: string) => {
  if (sport === 'basketball') {
    return { icon: mdiBasketball, color: SPORTS_COLORS.basketball }
  }
  if (sport === 'tennis') {
    return { icon: mdiTennisBall, color: SPORTS_COLORS.tennis }
  }
  if (sport === 'football') {
    return { icon: mdiSoccer, color: SPORTS_COLORS.football }
  }
  if (sport === 'volleyball') {
    return { icon: mdiVolleyball, color: SPORTS_COLORS.volleyball }
  }
  if (sport === 'multi') {
    return { icon: mdiAmpersand, color: SPORTS_COLORS.multi }
  }

  return { icon: mdiBell, color: SPORTS_COLORS.default }
}
