export const UTC_OPTIONS = [
  { value: '-12', label: 'UTC-12' },
  { value: '-11', label: 'UTC-11' },
  { value: '-10', label: 'UTC-10' },
  { value: '-9', label: 'UTC-9' },
  { value: '-8', label: 'UTC-8' },
  { value: '-7', label: 'UTC-7' },
  { value: '-6', label: 'UTC-6' },
  { value: '-5', label: 'UTC-5' },
  { value: '-4', label: 'UTC-4' },
  { value: '-3', label: 'UTC-3' },
  { value: '-2', label: 'UTC-2' },
  { value: '-1', label: 'UTC-1' },
  { value: '0', label: 'UTC' },
  { value: '+1', label: 'UTC+1' },
  { value: '+2', label: 'UTC+2' },
  { value: '+3', label: 'UTC+3' },
  { value: '+4', label: 'UTC+4' },
  { value: '+5', label: 'UTC+5' },
  { value: '+6', label: 'UTC+6' },
  { value: '+7', label: 'UTC+7' },
  { value: '+8', label: 'UTC+8' },
  { value: '+9', label: 'UTC+9' },
  { value: '+10', label: 'UTC+10' },
  { value: '+11', label: 'UTC+11' },
  { value: '+12', label: 'UTC+12' }
]

export enum BLOCKCHAIN_NETWORK {
  TRON = 'TRON'
}



export const SYMBOL_CURRENCY = {
  WON: ' 원',
  USD: ' $',
  TETHER: ' T',
  MAIN: ' 원',
  PERCENT: ' %'
}

export enum BANK_TYPE {
  BANK = 1,
  PAYPAL = 2,
  KAKAO = 3
}

export enum BANK_TYPE_NAME {
  KakaoPay = 'KakaoPay',
  PayPal = 'PayPal',
  Bank = 'Bank'
}

export enum PROCESS_STATUS_TYPE {
  COMPLETED = 'completed',
  CANCEL = 'cancel',
  PENDING = 'pending'
}

export enum STATUS_TRANSACTION {
  pending = 'pending',
  completed = 'completed',
  canceled = 'canceled'
}

export enum STATUS_TYPE {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export type TYPE_STATUS_ACCOUNT = 'active' | 'inactive' | 'pending' | 'banned' | 'deleted'
