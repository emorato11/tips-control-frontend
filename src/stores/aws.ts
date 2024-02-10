import { defineStore } from 'pinia'
import awsService from '@/services/aws'

export const useAWSStore = defineStore('aws', () => {
  const startSync = async () => {
    const response = await awsService.startSync()

    console.log(response)
  }

  const getStoredFiles = async () => {
    const response = await awsService.getStoredFiles()

    console.log(response)
  }

  return {
    getStoredFiles,
    startSync
  }
})
