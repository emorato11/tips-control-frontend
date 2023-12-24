import type { Tip } from '@/types/Tip'
import { apiInstance } from '../api/axios'

export default {
  async getAll() {
    try {
      const response = await apiInstance.get<Tip[]>('/tips')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  // show( id ){
  //     return apiInstance.get( 'https://music.com/api/v1/songs/'+id );
  // },

  // update( id, data ){
  //     return apiInstance.put( 'https://music.com/api/v1/songs/'+id, data );
  // },

  // create( data ){
  //     return apiInstance.post( 'https://music.com/api/v1/songs', data );
  // },

  // delete( id ){
  //     return apiInstance.delete( 'https://music.com/api/v1/songs/' + id )
  // }
}
