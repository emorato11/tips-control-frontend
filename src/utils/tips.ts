import { mdiBasketball, mdiTennisBall, mdiSoccer, mdiAmpersand, mdiBell } from '@mdi/js'

import { SPORTS_COLORS } from '@/types/SportsColor'

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
  if (sport === 'multi') {
    return { icon: mdiAmpersand, color: SPORTS_COLORS.multi }
  }

  return { icon: mdiBell, color: SPORTS_COLORS.default }
}
