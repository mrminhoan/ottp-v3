import { API } from '@/constants'
import { BaseService } from '@/service/axios/common'

export const MediaService = {
  uploadImage: (request) => {
    return BaseService.post({
      ...request,
      url: API.MEDIA.UPLOAD_IMAGE,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
