import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { CustomFormItem } from '@/components/ui/custom/custom-form'
import { CustomInput } from '@/components/ui/custom/custom-input'
import { formatBankAccountNumber } from '@/lib/format-bank-account-number'
import paypal_icon from '@/assets/icons/paypal.svg'
import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'

interface IProps {
  paypal_id?: string
  isForm?: boolean
  fieldName?: string
  wrapperClassName?: string
}

export default function PaypalPayCard(props: IProps) {
  const { paypal_id, isForm, fieldName, wrapperClassName } = props
  const methods = useFormContext()
  return (
    <div className={cn('w-full max-w-md p-4 grid gap-3 bg-paypal-gradient-bg text-white rounded-md', wrapperClassName)}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <img src={paypal_icon} alt='bank' className='w-10 text-primary' />
        </div>
        <div className='grid gap-1 text-right'>
          <div className='font-semibold text-sm'>Paypal Pay</div>
        </div>
      </div>

      {isForm ? (
        <>
          <CustomFormItem
            methods={methods}
            name={`${fieldName}.payment_details.paypal_id`}
            label='Paypal id'
            className='text-black'
          >
            <CustomInput placeholder='Paypal id' className='text-black' />
          </CustomFormItem>
        </>
      ) : (
        <div className='flex flex-col items-start justify-between gap-1'>
          <CustomButtonCopy textToCopy={paypal_id}>{paypal_id}</CustomButtonCopy>
        </div>
      )}
    </div>
  )
}
