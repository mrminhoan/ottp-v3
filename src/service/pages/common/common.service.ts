// import { InfoModel, InfoResponseModel } from '@/models/class/info/info.model'
// import { IApiRequest, IResponse } from '@/models/interfaces'
// import { BaseService } from '@/service/axios/common'

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
  // static getDailyStatistic(request: Partial<IApiRequest<{ id: string }>>) {
  //   return BaseService.get<TransactionResponseModel>({
  //     ...request,
  //     payload: {},
  //     url: API.COMMON.STATISTICS.DAILY,
  //     toResponse: InfoModel.toResponse,
  //     mockData: MOCK_INFO_DATA
  //   })
  // }

  static getMyIP() {
    return BaseService.get<{ ip: string }>({
      url: '',
      baseURL: 'https://api.ipify.org/?format=json'
    })
  }

  // static _getStatisticsRequest(request: Partial<IApiRequest<{ siteId: string }>>) {
  //   return BaseService.get<StatisticsResponseModel>({
  //     ...request,
  //     url: API.COMMON.STATISTICS.REQUEST,
  //     mockData: MOCK_STATISTICS_REQUEST_DATA
  //   })
  // }

  // static getStatisticsRequest(request: Partial<IApiRequest<{ siteId: string }>>) {
  //   return BaseService.post<StatisticsResponseModel>({
  //     ...request,
  //     url: API.COMMON.STATISTICS.REQUEST,
  //     mockData: MOCK_STATISTICS_REQUEST_DATA
  //   })
  // }

  // static getMenu(request: Partial<IApiRequest>) {
  //   return BaseService.post<MenuModel[]>({
  //     ...request,
  //     url: request.url || API.COMMON.MENU
  //   })
  // }

  // static getMe(request: Partial<IApiRequest<ShopModelResponse>>) {
  //   return BaseService.post<ShopModelResponse>({
  //     ...request,
  //     url: API.COMMON.ME,
  //     toResponse: ShopModelResponse.toResponse
  //   })
  // }
}
