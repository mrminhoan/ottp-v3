import { API } from '@/constants/api'
import { ShopModel, ShopModelResponse, ShopSearchModel } from '@/models/class/shop/shop.model'
import { IApiRequest } from '@/models/interface/api-request-model'
import { IResponse } from '@/models/interface/api-response-model'
import { BaseService } from '@/service/axios/common'

export class ShopService {
  static registerShop(request: Partial<IApiRequest<ShopModel>>) {
    return BaseService.post({
      ...request,
      url: API.SHOP.REGISTER,
      // url: '/shop/create',
      toRequest: ShopModel.toRequest
    })
  }

  static checkExistedShop(request: Partial<IApiRequest<ShopModel>>) {
    return BaseService.post<IResponse<{ is_exist: boolean }>>({
      ...request,
      url: API.SHOP.CHECK_EXISTED
    })
  }

  static getList(request: Partial<IApiRequest<ShopSearchModel>>) {
    return BaseService.post<ShopModelResponse[]>({
      ...request,
      url: API.SHOP.LIST,
      toResponse: ShopModelResponse.toResponse

      // mockData: MOCK_SHOP_LIST
    })
  }

  static getDetail(request: Partial<IApiRequest<{ shop_id: number }>>) {
    return BaseService.post<ShopModelResponse>({
      ...request,
      url: API.SHOP.DETAIL,
      toResponse: ShopModelResponse.toResponse
    })
  }
}
