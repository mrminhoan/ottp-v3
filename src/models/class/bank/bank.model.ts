import { BANK_TYPE, BANK_TYPE_NAME } from '@/constants/common'
import { BaseModel } from '../base.model'

export type TPaymentDetail = {
  bank_name: string
  bank_number: string
  real_name: string
  paypal_email: string
  paypal_name: string
  kakao_id: string
  phone_number: string
}

export class BankAcountModel extends BaseModel {
  account_holder_name: string
  account_number: string
  bank_name: string
  is_primary: boolean
  is_verified: boolean
  verification_date: string
  bank_number: string
  is_active: boolean
  seller_id: number
  payment_details: TPaymentDetail
  bank_type_id: BANK_TYPE
  bank_type_name: BANK_TYPE_NAME
  bank_type_image: string
}
