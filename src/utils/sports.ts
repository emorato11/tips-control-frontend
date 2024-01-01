import { Sports } from '@/types/Sports'
import type { Sport } from '@/types/Sports'

export const SPORTS_SELECTIONS: Sport[] = [
  { name: 'Tenis', value: Sports.TENNIS },
  { name: 'Futbol', value: Sports.FOOTBALL },
  { name: 'Baloncesto', value: Sports.BASKETBALL },
  { name: 'Voleibol', value: Sports.VOLLEY },
  { name: 'Multideporte', value: Sports.MULTI }
]

export const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
