import { BaseService } from '@/service/axios/common'
import { SellerModel, SellerSearchModel } from '@/models/class/seller/seller.model'
import { API } from '@/constants'
import { IApiRequest } from '@/models/interface/api-request-model'
// import { ExternalStore } from '@/service/axios/pages/external/external-store'

// const getShareId = () => {
//   return Number(ExternalStore.getShareId())
// }

export const SellerService = {
  getList(request: Partial<IApiRequest<SellerSearchModel>>) {
    return BaseService.post({
      ...request,
      url: API.SELLER.LIST,
      toResponse: SellerModel.toResponse
    })
  },

  getDetail(request: Partial<IApiRequest<{ seller_id: number }>>) {
    return BaseService.post({
      ...request,
      url: API.SELLER.DETAIL,
      payload: {
        seller_id: request.payload?.seller_id
      },
      toResponse: SellerModel.toResponse
    })
  }
}
