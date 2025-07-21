import { Landmark } from 'lucide-react'
import IcKakaoPay from '@/assets/icons/kakaopay.svg'
import IcPaypal from '@/assets/icons/paypal.svg'
import { BANK_TYPE } from '@/constants'

interface BadgePaymentProps {
  bank_type_id: BANK_TYPE
}

// Base style for all badges - fixed dimensions ensuring same height
const baseClass = 'w-12 min-h-[32px] h-8 rounded-md flex items-center justify-center shadow-md'

export const KakaoBadge = () => {
  return (
    <div className={`bg-kakao-gradient ${baseClass}`}>
      <img src={IcKakaoPay} alt='kakao' className='w-6 h-6 object-contain' />
    </div>
  )
}

export const PaypalBadge = () => {
  return (
    <div className={`bg-white ${baseClass}`} style={{ border: '1px solid hsl(var(--border))', boxSizing: 'border-box' }}>
      <img src={IcPaypal} alt='paypal' className='w-6 h-6 object-contain' />
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
