import { API } from '@/constants'
import { TransferLogModel, TransferLogSearchModel } from '@/models/class/_log/tranfer-log.model'
import { IApiRequest } from '@/models/interface/api-request-model'
import { BaseService } from '@/service/axios/common'

export class LogService {
  static getTransferLogs(request: Partial<IApiRequest<TransferLogSearchModel>>) {
    return BaseService.post({
      ...request,
      url: API.LOGS.TRANSFER_LOGS,
      toResponse: TransferLogModel.toResponse
    })
  }
}
