// import { InfoModel, InfoResponseModel } from '@/models/class/info/info.model'
// import { IApiRequest, IResponse } from '@/models/interfaces'
// import { BaseService } from '@/service/axios/common'

import { API } from '@/constants'
import { ShopModelResponse } from '@/models/class/shop/shop.model'
import { IApiRequest } from '@/models/interface/api-request-model'
import { BaseService } from '@/service/axios/common'
// import { API } from '@/constants'
// import {
//   MenuModel,
//   ShopModelResponse,
//   StatisticsResponseModel,
//   TransactionModel,
//   TransactionResponseModel,
//   TransactionSearchModel
// } from '@/models/class'
// : Promise<IResponse<InfoResponseModel>>
export class CommonService {
  static getMyIP() {
    return BaseService.get<{ ip: string }>({
      url: '',
      baseURL: 'https://api.ipify.org/?format=json'
    })
  }
  static getMe(request: Partial<IApiRequest<{ shopId: string }>>) {
    return BaseService.post<ShopModelResponse>({
      ...request,
      // payload: {
      //   shopId: Number(request.payload?.shopId)
      // },
      url: API.COMMON.ME,
      toResponse: ShopModelResponse.toResponse
    })
  }
}
