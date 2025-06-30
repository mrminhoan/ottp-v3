import { CustomFormItem } from '@/components/ui/custom/custom-form'
import { CustomInput } from '@/components/ui/custom/custom-input'
import { formatBankAccountNumber } from '@/lib/format-bank-account-number'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import chip from '@/assets/icons/chip.png'
import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'

interface IProps {
  bankName?: string
  accountNumber?: string
  accountName?: string
  isForm?: boolean
  fieldName?: string
  wrapperClassName?: string
}

export default function CardBank(props: IProps) {
  const { bankName, accountNumber, accountName, isForm, fieldName, wrapperClassName } = props

  const methods = useFormContext()
  return (
    <div className={cn('w-full max-w-md p-4 grid gap-2 bg-bank-gradient text-white rounded-md', wrapperClassName)}>
      <div className='flex items-center justify-between'>
        <img src={chip} alt='bank' className='h-4 w-6 text-primary' />

        {isForm ? (
          <>
            <CustomFormItem methods={methods} name={`${fieldName}.payment_details.bank_name`} label='Bank Name'>
              <CustomInput placeholder='Bank name' className='text-black' />
            </CustomFormItem>
          </>
        ) : (
          <div className='grid gap-1 text-right'>
            <div className='font-semibold text-sm'>{bankName}</div>
          </div>
        )}
      </div>

      {isForm ? (
        <>
          <CustomFormItem methods={methods} name={`${fieldName}.account_number`} label='Bank number'>
            <CustomInput placeholder='Bank number' className='text-black' />
          </CustomFormItem>
          <CustomFormItem methods={methods} name={`${fieldName}.payment_details.real_name`} label='Account number'>
            <CustomInput placeholder='Account name' className='text-black' />
          </CustomFormItem>
        </>
      ) : (
        <div className='flex flex-col items-start justify-between gap-1'>
          <CustomButtonCopy textToCopy={accountNumber}>{formatBankAccountNumber(accountNumber)}</CustomButtonCopy>
          <p>{accountName}</p>
        </div>
      )}
    </div>
  )
}
