import { API } from '@/constants'
import { MemberModel, MemberModelResponse, MemberSearchModel } from '@/models/class/member/member.model'
import { IApiRequest } from '@/models/interface/api-request-model'
import { BaseService } from '@/service/axios/common'

export class MemberService {
  static registerMemeber(request: Partial<IApiRequest<MemberModel>>) {
    return BaseService.post({
      ...request,
      url: API.MEMBER.REGISTER
    })
  }

  static getList(request: Partial<IApiRequest<MemberSearchModel>>) {
    return BaseService.post<MemberModelResponse[]>({
      ...request,
      url: API.MEMBER.LIST,
      toResponse: MemberModelResponse.toResponse
      // mockData: MOCK_USER_LIST
    })
  }
}
