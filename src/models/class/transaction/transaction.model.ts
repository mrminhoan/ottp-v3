import { BLOCKCHAIN_NETWORK, PROCESS_STATUS_TYPE, STATUS_TRANSACTION, STATUS_TYPE } from '@/constants'
import { BaseModel } from '../base.model'
import { PaymentAccountModel } from '../payment/payment.model'
import { ShopModel } from '../shop/shop.model'
import { BaseSearchModel } from '../search/base-search-model'
import { DateTimeHelper } from '@/lib/date-time-helper'
import { FORMAT_DATE } from '@/constants/format-date'

export type TShopTransaction = {}
export type TUserTransaction = {
  id: number
  kakao_id: string
  username: string
  bank_info: PaymentAccountModel
  full_name: string
  google_id: string
  address_hex: string
  address_base58: string
  blockchain_network: BLOCKCHAIN_NETWORK
}
export type Tseller = {
  username: string
  bank_info: PaymentAccountModel
  address_hex: string
  address_base58: string
  blockchain_network: BLOCKCHAIN_NETWORK
}

export type TSeller = {
  username: string
  bank_info: PaymentAccountModel
}

export class TransactionModel extends BaseModel {
  shop: ShopModel
  user: TUserTransaction
  seller: Tseller
  expiry_time: string
  fiat_amount: number
  status_order: STATUS_TRANSACTION
  tether_amount: number
  transaction_id: number
  transaction_hash: string
  master_commission: number
  transaction_amount: number

  _dateCreated: string
  _dateUpdated: string
  _expiry_time: string

  static toResponse(data: TransactionModel) {
    return {
      ...data,
      _dateCreated: DateTimeHelper.convertISOToFormat(data.created_at, FORMAT_DATE.YYYY_MM_DD_HH_mm_ss),
      _dateUpdated: DateTimeHelper.convertISOToFormat(data.updated_at, FORMAT_DATE.YYYY_MM_DD_HH_mm_ss),
      _expiry_time: DateTimeHelper.convertISOToFormat(data.expiry_time, FORMAT_DATE.YYYY_MM_DD_HH_mm_ss)
    }
  }
}

export class TransactionSearchModel extends BaseSearchModel {
  status: PROCESS_STATUS_TYPE[] = []
  from_date: string = DateTimeHelper.getOneWeekAgoWithUtcOffsetFormatted()
  to_date: string = DateTimeHelper.getTodayWithUtcOffsetFormatted()
}

export class TransactionRequestModel extends BaseModel {}
