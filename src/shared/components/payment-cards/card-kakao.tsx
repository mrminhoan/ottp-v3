import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { CustomFormItem } from '@/components/ui/custom/custom-form'
import { CustomInput } from '@/components/ui/custom/custom-input'
import { formatBankAccountNumber } from '@/lib/format-bank-account-number'
import kakaopay from '@/assets/icons/kakaopay.svg'
import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'
interface IProps {
  kakao_id?: string
  isForm?: boolean
  fieldName?: string
  wrapperClassName?: string
}

export default function KakaoPayCard(props: IProps) {
  const { kakao_id, isForm, fieldName, wrapperClassName } = props
  const methods = useFormContext()
  return (
    <div className={cn('w-full max-w-md p-4 grid gap-3 bg-kakao-gradient text-white rounded-md', wrapperClassName)}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          {/* <CreditCardIcon className='h-8 w-8 text-primary' /> */}
          <img src={kakaopay} alt='bank' className='w-10 text-primary' />
        </div>
        <div className='grid gap-1 text-right'>
          <div className='font-semibold text-sm'>Kakao Pay</div>
        </div>
      </div>

      {isForm ? (
        <>
          <CustomFormItem methods={methods} name={fieldName} label='Kakao id'>
            <CustomInput placeholder='Kakao number' className='text-black' />
          </CustomFormItem>

          {/* <ButtonWithIconV2 iconEnd={<Pen />} className='w-[4rem] text-xs bg-black ml-auto'>
            Edit
          </ButtonWithIconV2> */}
        </>
      ) : (
        <div className='flex flex-col items-start justify-between gap-1'>
          <CustomButtonCopy textToCopy={kakao_id}>{formatBankAccountNumber(kakao_id)}</CustomButtonCopy>
        </div>
      )}
    </div>
  )
}
