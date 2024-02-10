import { defineStore } from 'pinia'
import telegramService from '@/services/telegram'

export const useTelegramStore = defineStore('telegram', () => {
  const initBot = async () => {
    const response = await telegramService.initTelegramBot()

    console.log(response)
  }
  return {
    initBot
  }
})
