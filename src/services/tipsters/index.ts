import type { CreateTipster, Tipster } from '@/types/Tipster'
import { apiInstance } from '../api/axios'

export default {
  async getAll() {
    try {
      const response = await apiInstance.get<Tipster[]>('/tipsters')

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async create(tipster: CreateTipster) {
    try {
      const response = await apiInstance.post<Tipster>('/tipsters', tipster)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  // update( id, data ){
  //     return apiInstance.put( 'https://music.com/api/v1/songs/'+id, data );
  // },

  // delete( id ){
  //     return apiInstance.delete( 'https://music.com/api/v1/songs/' + id )
  // }
}
