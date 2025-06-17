import { API } from '@/constants/api'
import { IApiRequest } from '@/models/interface/api-request-model'
import { TLogin } from '@/models/schema/login.schema'
import { BaseService } from '@/service/axios/common'

export class AuthService {
  static login(request: Partial<IApiRequest<TLogin>>) {
    return BaseService.post<any>({
      ...request,
      url: API.SITE.LOGIN
    })
  }
  static logout(request?: Partial<IApiRequest<any>>) {
    return BaseService.post<any>({
      ...request,
      url: API.SITE.LOGOUT
    })
  }

  static refreshToken(request?: Partial<IApiRequest>) {
    return BaseService.post<any>({
      ...request,
      url: API.SITE.REFRESS_TOKEN
    })
  }

  static getMeInfo(request?: Partial<IApiRequest>) {
    return BaseService.post<any>({
      ...request,
      url: API.SITE.ME_INFO
    })
  }
}
