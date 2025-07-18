import { API } from '@/constants'
import { TransactionModel, TransactionSearchModel } from '@/models/class/transaction/transaction.model'
// import { MOCK_RECENT_TRANSACTION_DATA } from '@/constants/fake-data'
import { IApiRequest } from '@/models/interface/api-request-model'
import { BaseService } from '@/service/axios/common'

export class TransactionService {
  static getDepositList(request: Partial<IApiRequest<TransactionSearchModel>> = {}) {
    return BaseService.post({
      ...request,
      url: API.TRANSACTION.LIST,
      toResponse: TransactionModel.toResponse
    })
  }
  static acceptTransaction(request: Partial<IApiRequest<{ id: number }>>) {
    return BaseService.post({
      ...request,
      url: API.TRANSACTION.ACCEPT
    })
  }

  static cancelTransaction(request: Partial<IApiRequest<{ id: number }>>) {
    return BaseService.post({
      ...request,
      url: API.TRANSACTION.CANCEL
    })
  }
}
