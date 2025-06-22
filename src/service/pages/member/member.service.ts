import { API } from '@/constants'
import { MOCK_RECENT_TRANSACTION_DATA } from '@/constants/fake-data'
import { TransactionModel, TransactionResponseModel, TransactionSearchModel } from '@/models/class/transaction/transaction.model'
import { IApiRequest } from '@/models/interface/api-request-model'
import { BaseService } from '@/service/axios/common'

export class TransactionService {
    static getRecentTransactionList(
        request: Partial<IApiRequest<TransactionSearchModel, TransactionResponseModel[]>> = {}
    ) {
        return BaseService.get({
            ...request,
            url: API.COMMON.RECENT_TRANSACTION_LIST,
            toResponse: TransactionModel.toResponse,
            mockData: MOCK_RECENT_TRANSACTION_DATA
        })
    }
}
