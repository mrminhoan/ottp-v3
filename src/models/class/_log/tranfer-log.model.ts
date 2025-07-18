import { BaseModel } from '../base.model'
import { BaseSearchModel } from '../search/base-search-model'

type TActionRequest = 'accept' | 'cancel' | 'request'

export class TransferLogModel extends BaseModel {
  action: TActionRequest
  notice: string
  txn_id: string
  message: string

  shop_id: number
  shop_name: string
  username_shop: string

  user_id: number
  username: string

  seller_id: number
  seller_name: string
  username_seller: string

  success: boolean
  response: {
    data: any
    error: string
    status: number
    success: boolean
  }
  trace_id: string

  information: {
    txn_hash: string
    username: string
    fiat_amount: string
    tether_amount: string
  }
  requestUrl: string
  status_code: number
  process_date: string
  request_date: string
  response_date: string

  actionName: string

  userId: number
  userName: string
  sellerId: number
  sellerName: string
  shopId: number
  shopName: string

  errorCode: number

  requestDate: string
  processDate: string
  responseDate: string

  result: {
    balance: number
    code: number
  }

  public static toResponse(data: TransferLogModel): TransferLogModel {
    return data
  }
}

export class TransferLogSearchModel extends BaseSearchModel {}
