import { DateTimeHelper } from '@/lib/date-time-helper'
import { BaseModel } from '../base.model'
import { FORMAT_DATE } from '@/constants/format-date'
import { BaseSearchModel } from '../search/base-search-model'

class BankAcountModel extends BaseModel {
  account_holder_name: string
  account_number: string
  bank_name: string
  is_primary: boolean
  is_verified: boolean
  verification_date: string
}

class StatisticsModel extends BaseModel {
  deposit_transaction_count: number
  last_updated_at: string
  total_cancel_deposit: number
  total_cancel_withdraw: number
  total_deposit: number
  total_deposit_t: number
  total_withdraw: number
  total_withdraw_t: number
  withdraw_transaction_count: number
}

type TStatus = 'active' | 'inactive' | 'pending' | 'banned' | 'deleted'

export class MemberModel extends BaseModel {
  address_base58: string
  balance: number
  bank_accounts: BankAcountModel[]
  email: string
  full_name: string
  is_bank_verified: boolean
  last_login: string
  login_count: number
  profile_image_url: string
  shop_id: number
  status: TStatus
  username: string
  wallet_address_base58: string
  wallet_address_hex: string
  kakao_id: string
  google_id: string

  statistics: StatisticsModel

  totalTether: number
  total_cancel_deposit: number
  total_cancel_withdraw: number
  total_deposit: number
  total_deposit_t: number
  total_withdraw: number
  total_withdraw_t: number
  withdraw_transaction_count: number
  deposit_transaction_count: number

  memberId: string
  memberName: string
  tetherAmount: number
  walletUrl: string
  deposit: number
  withdraw: number
  isActive: boolean

  bank_name: string
  account_holder_name: string
  account_number: string

  _dateCreated: string
  _dateUpdated: string
  _last_login: string
}

export class MemberSearchModel extends BaseSearchModel {
  shop_id: number
}

export class MemberModelResponse extends MemberModel {
  static toResponse(data: MemberModel): MemberModelResponse {
    return {
      ...data,
      _dateCreated: DateTimeHelper.convertISOToFormat(data.created_at, FORMAT_DATE.YYYY_MM_DD_HH_mm_ss),
      _dateUpdated: DateTimeHelper.convertISOToFormat(data.updated_at, FORMAT_DATE.YYYY_MM_DD_HH_mm_ss),
      _last_login: DateTimeHelper.convertISOToFormat(data.last_login, FORMAT_DATE.YYYY_MM_DD_HH_mm_ss)
    }
  }
}
