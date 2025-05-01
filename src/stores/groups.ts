import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreateGroup, Group } from '@/types/Group'
import groupsService from '@/services/groups'

export const useGroupsStore = defineStore('groups', () => {
  const groups = ref<Group[]>([])
  const selectedGroup = ref<Group>()
  const loading = ref(false)

  const getAllGroups = async () => {
    loading.value = true
    const groupsResponse = await groupsService.getAll()
    groups.value = groupsResponse || []

    loading.value = false
  }
  const getAllGroupsByTipsterId = async (tipsterId: string) => {
    loading.value = true
    const groupsResponse = await groupsService.getAllByTipsterId({ tipsterId })
    groups.value = groupsResponse || []

    loading.value = false
  }

  const createGroup = async (newGroup: CreateGroup) => {
    loading.value = true
    const tipsterCreated = await groupsService.create(newGroup)

    if (tipsterCreated) {
      groups.value = [...groups.value, tipsterCreated]
    }

    loading.value = false
  }

  const updateGroup = async (tipsterId: string, payload: CreateGroup) => {
    loading.value = true
    const response = await groupsService.update(tipsterId, payload)

    if (response) {
      // groups.value = groups.value.filter((tipster) => tipster.id !== tipsterId)
    }

    loading.value = false
  }

  const selectGroup = (tipsterId: string) => {
    selectedGroup.value = groups.value.find((tipster) => tipster.id === tipsterId)
  }

  return {
    getAllGroups,
    createGroup,
    selectGroup,
    updateGroup,
    getAllGroupsByTipsterId,
    selectedGroup,
    groups,
    loading
  }
})
