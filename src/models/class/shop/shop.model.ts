import { BaseModel } from '../base.model'
import { BaseSearchModel } from '../search/base-search-model'
import { BLOCKCHAIN_NETWORK, STATUS_TRANSACTION } from '@/constants'

export class ShopModel extends BaseModel {
  username: string
  shop_name: string
  password: string
  representative: string
  email: string
  insurance_money: number
  commission_rate: number
  commission_rate_withdraw: number
  is_active_otp: boolean
  image: any
  api_key: string
  commission_earned: number
  description: string
  commission_paid: number
  deposit_transaction_count: number
  endpoint_registered_at: string
  endpoint_status: string
  endpoint_url: string
  parent_shop_id: number
  total_deposit: number
  total_withdraw: number
  wallet_address_base58: string
  wallet_address_hex: string
  withdraw_transaction_count: number
  is_deleted: boolean
  user_count: boolean
  address_base58: string
  total_deposit_t: number
  total_withdraw_t: number
  is_master_account: boolean
  blockchain_network: BLOCKCHAIN_NETWORK
  status: STATUS_TRANSACTION

  _dateCreated: string
  _dateUpdated: string
  _fullName: string

  userAmount: number
  depositRate: number
  withdrawalRate: number
  withdrawal: number
  deposit: number
  whiteIpID: number
  whiteIp: string

  static toRequest(data: Partial<ShopModel>) {
    const insurance_money = data.insurance_money ? Number(data.insurance_money) : 0
    const commission_rate = data.commission_rate ? Number(data.commission_rate) : 0
    const commission_rate_withdraw = data.commission_rate_withdraw ? Number(data.commission_rate_withdraw) : 0
    const endpoint_url = 'https://acupdi912.com/api/ottpay/callback'
    return {
      ...data,
      insurance_money,
      commission_rate,
      commission_rate_withdraw,
      endpoint_url
    }
  }
}

export class ShopModelResponse extends ShopModel {
  _whiteIp?: string

  static toResponse(data: ShopModel): ShopModelResponse {
    let newWhiteIp = data.whiteIp ? data.whiteIp.split('.').join('') : ''
    return {
      ...data,
      _whiteIp: newWhiteIp,
      _fullName: data?.shop_name
    }
  }
}

export class ShopSearchModel extends BaseSearchModel {
  shop_id: number
  status: STATUS_TRANSACTION = null
}

export class ShopModelRequest extends ShopModel {}
