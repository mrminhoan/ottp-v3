import { useCustomForm } from '@/hooks/use-custom-form'
import { useShopQuery } from '../query/useShopQuery'
import { useEffect } from 'react'
import { PersonalInfo } from './component/personal-info'
import { CustomFormItem, FormWrapper } from '@/components/ui/custom/custom-form'
import { CustomInput } from '@/components/ui/custom/custom-input'
import { CustomInputNumber } from '@/components/ui/custom/custom-input/custom-input-number'
import { SYMBOL_CURRENCY } from '@/constants/common'
import { CustomSwitch } from '@/components/ui/custom/custom-switch/custom-switch'
import UploadImage from '@/components/ui/custom/custom-upload-image/custom-upload-img'

export default function BasicInfo() {
  const { data: shopData, isFetching } = useShopQuery()

  // Get the shop info object first
  const shopInfo = shopData?.data?.data

  const { methods, reset } = useCustomForm<any>({
    // zodSchema: userSchema,
    defaultValues: {
      username: '',
      shopName: '',
      note: '',
      apiKey: '',
      endpoint_url: '',
      commission_rate: 0,
      commission_rate_withdraw: 0,
      is_active_login: 0,
      email: '',
      insuranceMoney: 0,
      representative: ''
    }
  })

  useEffect(() => {
    if (shopInfo) {
      const dataDetail = shopInfo

      reset({
        username: dataDetail.username,
        shop_name: dataDetail.shop_name,
        note: dataDetail.description,
        api_key: dataDetail.api_key,
        endpoint_url: dataDetail.endpoint_url,
        commission_rate: dataDetail.commission_rate,
        commission_rate_withdraw: dataDetail.commission_rate_withdraw,
        is_active_login: dataDetail.is_active_otp,
        email: dataDetail.email,
        insuranceMoney: dataDetail.insurance_money,
        representative: dataDetail.representative
      })
    }
  }, [shopInfo, reset])

  const onFinish = async (data) => {
    console.log(data)
  }

  const handleUploadImage = async (e) => {
    const file = e
    const formData = new FormData()
    formData.append('shop_image', file)
  }

  return (
    <FormWrapper methods={methods} className='flex flex-col gap-3 w-full' onSubmit={onFinish}>
      {/* Personal Infomation */}
      <InfoRow>
        <InfoGroup>
          <p className='text-md font-bold text-foreground'>Personal Information</p>
          <CustomFormItem name='username' label='User Name'>
            <CustomInput placeholder='Enter shop id' />
          </CustomFormItem>

          <CustomFormItem name='shop_name' label='Shop Name'>
            <CustomInput placeholder='Enter shop name' />
          </CustomFormItem>
        </InfoGroup>

        {/* API Payment */}
        <InfoGroup>
          <p className='text-md font-bold text-foreground'>Api Payment</p>
          <CustomFormItem name='api_key' label='Token' className='flex-1'>
            <CustomInput placeholder='Enter api key' />
          </CustomFormItem>

          <CustomFormItem name='endpoint_url' label='End Point' className='flex-1'>
            <CustomInput placeholder='Enter shop name' />
          </CustomFormItem>

          <CustomFormItem name='commission_rate' label='Deposit Rate' className='flex-1'>
            <CustomInputNumber placeholder='Deposit rate' suffix={SYMBOL_CURRENCY.PERCENT} min={0} stepper={0.1} />
          </CustomFormItem>

          <CustomFormItem methods={methods} name='commission_rate_withdraw' label='Withdraw Rate' className='flex-1'>
            <CustomInputNumber placeholder='Withdraw rate' stepper={0.01} suffix={SYMBOL_CURRENCY.PERCENT} />
          </CustomFormItem>
        </InfoGroup>
      </InfoRow>

      <InfoRow>
        {/* Settings */}
        <InfoGroup>
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
          <CustomFormItem name='is_active_api'>
            <CustomSwitch title='API' className='w-full justify-between' />
          </CustomFormItem>
        </InfoGroup>

        <InfoGroup>
          <p className='text-md font-bold text-foreground'>Registration Document</p>
          <CustomFormItem name='representative' label='Representative Name'>
            <CustomInput placeholder='Representative Name' />
          </CustomFormItem>

          <CustomFormItem name='email' label='Email'>
            <CustomInput placeholder='Email' />
          </CustomFormItem>

          <UploadImage onChange={handleUploadImage} label='Shop Image' />
        </InfoGroup>
      </InfoRow>
    </FormWrapper>
  )
}

const InfoGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex flex-col flex-1 gap-6 rounded-md p-4 bg-surface shadow-lg min-w-[20rem]'>{children}</div>
}

const InfoRow = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex w-full gap-6 flex-wrap'>{children}</div>
}
