import { useCustomForm } from '@/hooks/use-custom-form'
import { CustomFormItem, FormWrapper } from '@/components/ui/custom/custom-form'
import { useSellerQuery } from '../query/useSellerQuery'
import { CustomInput } from '@/components/ui/custom/custom-input'
import { CustomInputNumber } from '@/components/ui/custom/custom-input/custom-input-number'
import { SYMBOL_CURRENCY } from '@/constants/common'
import { useEffect } from 'react'
import { CustomSwitch } from '@/components/ui/custom/custom-switch/custom-switch'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { QRCodeSVG } from 'qrcode.react'
import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'
import { CustomButton } from '@/components/ui/custom/custom-button/button'

export default function BasicInfo() {
  const { data: seller, isFetching } = useSellerQuery()
  const { methods, reset, getValues } = useCustomForm<any>({
    // zodSchema: userSchema,
    defaultValues: {
      username: '',
      seller_name: '',
      commission_rate: '',
      commission_withdraw_rate: '',
      address_base58: ''
    }
  })

  const sellerInfo = seller?.data?.data
  const onFinish = async (data) => {
    console.log(data)
  }

  useEffect(() => {
    if (sellerInfo) {
      const dataDetail = sellerInfo

      reset({
        username: dataDetail.username,
        seller_name: dataDetail.seller_name,
        note: dataDetail.description,
        commission_rate: dataDetail.commission_rate,
        commission_withdraw_rate: dataDetail.commission_withdraw_rate,
        address_base58: dataDetail.address_base58
      })
    }
  }, [sellerInfo, reset])

  return (
    <FormWrapper methods={methods} className='flex flex-col gap-4 w-full' onSubmit={onFinish}>
      <InfoRow>
        <InfoGroup>
          <p className='text-md font-bold text-foreground'>Personal Information</p>
          <CustomFormItem name='username' label='Seller Id'>
            <CustomInput placeholder='Enter seller id' />
          </CustomFormItem>

          <CustomFormItem name='seller_name' label='Seller Name'>
            <CustomInput placeholder='Enter seller name' />
          </CustomFormItem>
        </InfoGroup>

        {/* API Payment */}
        <InfoGroup>
          <p className='text-md font-bold text-foreground'>Commission</p>
          <CustomFormItem name='commission_rate' label='Deposit Rate' className='flex-1'>
            <CustomInputNumber placeholder='Deposit rate' suffix={SYMBOL_CURRENCY.PERCENT} min={0} stepper={0.1} />
          </CustomFormItem>

          <CustomFormItem methods={methods} name='commission_withdraw_rate' label='Withdraw Rate' className='flex-1'>
            <CustomInputNumber placeholder='Withdraw rate' stepper={0.01} suffix={SYMBOL_CURRENCY.PERCENT} />
          </CustomFormItem>
        </InfoGroup>
      </InfoRow>

      <InfoRow>
        <InfoGroup className='w-1/2'>
          <p className='text-md font-bold text-foreground'>Settings</p>
          <CustomFormItem name='is_active_login'>
            <CustomSwitch title='Login' className='w-full justify-between' />
          </CustomFormItem>
          <CustomFormItem name='is_active_otp'>
            <CustomSwitch title='OTP Google' className='w-full justify-between' />
          </CustomFormItem>
          <CustomFormItem name='is_active_exchange'>
            <CustomSwitch title='Exchange' className='w-full justify-between' />
          </CustomFormItem>
        </InfoGroup>
        <InfoGroup className='w-1/2 bg-transparent shadow-none'></InfoGroup>
      </InfoRow>

      <InfoRow>
        <InfoGroup>
          <p className='text-md font-bold text-foreground'>Wallet Info</p>
          <div className='flex items-center gap-20'>
            {/* <CustomFormItem name='address_base58' label='Wallet address' className='flex-1'>
              <CustomInput />
            </CustomFormItem> */}
            <CustomButtonCopy
              textToCopy={getValues('address_base58')}
              classNameContent='max-w-none'
              classNameButton='flex-1 justify-start border border-border rounded-md p-2'
            >
              {getValues('address_base58')}
            </CustomButtonCopy>
            <QRCodeSVG value={getValues('address_base58')} size={130} level='L' />
          </div>
        </InfoGroup>
      </InfoRow>

      <InfoRow>
        <InfoGroup>
          <p className='text-md font-bold text-foreground'>Note</p>
          <Textarea />
        </InfoGroup>
      </InfoRow>

      <div className='flex justify-end'>
        <CustomButton type='button' className='mt-4  font-bold w-[6rem]' onClick={methods.handleSubmit(onFinish)}>
          Save
        </CustomButton>
      </div>
    </FormWrapper>
  )
}

const InfoGroup = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <div className={cn('flex flex-col flex-1 gap-6 rounded-md p-4 bg-surface shadow-lg min-w-[20rem]', className)}>
      {children}
    </div>
  )
}

const InfoRow = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('flex w-full gap-4 flex-wrap', className)}>{children}</div>
}
