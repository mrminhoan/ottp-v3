import { DateTimeHelper } from '@/lib/date-time-helper'
import { BaseModel } from '../base.model'
import { BaseSearchModel } from '../search/base-search-model'
import { FORMAT_DATE } from '@/constants/format-date'

export class TransactionSearchModel extends BaseSearchModel { }

export class TransactionModel extends BaseModel {
  shopId: string
  shopName: string
  userId: string
  userName: string
  sellerId: string
  sellerName: string
  amount: number
  usdt: number
  commission: number
  completedAt: string

  public static toResponse(data: TransactionModel): TransactionModel {
    return { ...data }
  }
}
export class TransactionResponseModel extends TransactionModel { }
