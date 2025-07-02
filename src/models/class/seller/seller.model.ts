import { BANK_TYPE, TYPE_STATUS_ACCOUNT } from '@/constants/common'
import { BankAcountModel } from '@/models/class/bank/bank.model'
import { BaseModel } from '../base.model'
import { BaseSearchModel } from '../search/base-search-model'
import { DateTimeHelper } from '@/lib/date-time-helper'
import { FORMAT_DATE } from '@/constants/format-date'

export class SellerModel extends BaseModel {
  address_base58: string
  address_hex: string
  commission_rate: number
  commission_withdraw_rate: number
  deposit_transaction_count: number
  list_account_banks: BankAcountModel[]
  seller_name: string
  status: TYPE_STATUS_ACCOUNT
  total_cancel_deposit: number
  total_cancel_withdraw: number
  total_deposit: number
  total_deposit_t: number
  total_withdraw: number
  total_withdraw_t: number
  username: string
  withdraw_transaction_count: number

  _kakaos: BankAcountModel[]
  _paypals: BankAcountModel[]
  _banks: BankAcountModel[]
  _fullName: string

  _dateCreated: string
  _dateUpdated: string

  static toResponse(data: SellerModel): SellerModel {
    const kakaos = data?.list_account_banks?.filter((item) => item.bank_type_id === BANK_TYPE.KAKAO)
    const paypals = data?.list_account_banks?.filter((item) => item.bank_type_id === BANK_TYPE.PAYPAL)
    const banks = data?.list_account_banks?.filter((item) => item.bank_type_id === BANK_TYPE.BANK)
    return {
      ...data,
      _dateCreated: DateTimeHelper.formatWithUtcOffset(data.created_at, FORMAT_DATE.YYYY_MM_DD_HH_mm_ss),
      _dateUpdated: DateTimeHelper.formatWithUtcOffset(data.updated_at, FORMAT_DATE.YYYY_MM_DD_HH_mm_ss),
      _kakaos: kakaos,
      _paypals: paypals,
      _banks: banks,
      _fullName: data?.seller_name
    }
  }
}

export class SellerSearchModel extends BaseSearchModel {
  payment_type: string | null = null
  min_tether: number = 0
  max_tether: number = 0
}
