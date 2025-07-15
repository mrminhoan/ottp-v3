import { Landmark } from 'lucide-react'
import IcKakaoPay from '@/assets/icons/kakaopay.svg'
import IcPaypal from '@/assets/icons/paypal.svg'
import { BANK_TYPE } from '@/constants'

interface BadgePaymentProps {
  bank_type_id: BANK_TYPE
}

// Base style for all badges
const baseClass = 'w-[3rem] h-8 rounded-md flex items-center justify-center shadow-md'

export const KakaoBadge = () => {
  return (
    <div className={`bg-kakao-gradient ${baseClass}`}>
      <img src={IcKakaoPay} alt='kakao' className='w-8 h-8' />
    </div>
  )
}

export const PaypalBadge = () => {
  return (
    <div className={`bg-white border border-border ${baseClass}`}>
      <img src={IcPaypal} alt='paypal' className='w-8 h-8' />
    </div>
  )
}

export const BankBadge = () => {
  return (
    <div className={`bg-bank-gradient text-white ${baseClass}`}>
      <Landmark className='w-4 h-4' />
    </div>
  )
}

export const BadgePayment = ({ bank_type_id }: BadgePaymentProps) => {
  switch (bank_type_id) {
    case BANK_TYPE.KAKAO:
      return <KakaoBadge />
    case BANK_TYPE.PAYPAL:
      return <PaypalBadge />
    case BANK_TYPE.BANK:
      return <BankBadge />
    default:
      return null
  }
}
