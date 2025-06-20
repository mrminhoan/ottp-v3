import { Switch } from '@/components/animate-ui/base/switch'
import { CustomButton } from '@/components/ui/custom/custom-button/button'
import CustomButtonCopy from '@/components/ui/custom/custom-button/button-copy'
import { useGlobalDialog } from '@/components/ui/custom/custom-dialog/custom-dialog'
import { CustomFormItem, FormWrapper } from '@/components/ui/custom/custom-form'
import { CustomInput, CustomInputPassword } from '@/components/ui/custom/custom-input'
import { CustomInputNumber } from '@/components/ui/custom/custom-input/custom-input-number'
import { CustomSwitch } from '@/components/ui/custom/custom-switch/custom-switch'
import { alertService } from '@/components/ui/custom/custom-toast/alert.service'
import UploadImage from '@/components/ui/custom/custom-upload-image/custom-upload-img'
import { SYMBOL_CURRENCY } from '@/constants/common'
import { useCheckStatus } from '@/hooks/use-check-status'
import { useCustomForm } from '@/hooks/use-custom-form'
import { shopSchema } from '@/models/schema'
import { MediaService } from '@/pages/media/media.service'
import { ShopService } from '@/service/pages/shop/shop.service'
import { useCustomMutation } from '@/tanstack-query/use-custom-mutation'
import { CheckIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const TIME_COUNT_DOWN = 10000
export const CreateForm = () => {
  const { status, setStatus, reset, setChecking, setExisted, setNotExisted } = useCheckStatus()
  const { formRef, close } = useGlobalDialog()

  const [successUrl, setSuccessUrl] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<number>(10)

  const { methods, setValue, formState, getValues, trigger } = useCustomForm<any>({
    zodSchema: shopSchema,
    defaultValues: {
      username: '',
      shop_name: '',
      password: '',
      representative: '',
      email: '',
      insurance_money: '0',
      commission_rate: '0',
      commission_rate_withdraw: '0',
      is_active_otp: false,
      shop_image: ''
    }
    // mode: 'all'
  })

  const { mutateAsync: uploadImage } = useCustomMutation({
    fetcher: MediaService.uploadImage,
    onSuccess: (res) => {
      const data = res?.data?.data
      setValue('shop_image', data?.path_image)
      return data
    },
    props: {
      onError: (err) => {
        console.log(err)
      }
    }
  })

  const { mutateAsync: checkExistedShop, isPending: isCheckingExistedShop } = useCustomMutation({
    fetcher: ShopService.checkExistedShop,
    onSuccess: (data) => {
      return data
    },
    props: {
      onError: (err) => {
        console.log(err)
      }
    }
  })

  const { mutateAsync: registerShop, isPending: isRegisteringShop } = useCustomMutation({
    fetcher: ShopService.registerShop,
    onSuccess: (res) => {
      handleRegisterSuccess(res)
    },
    props: {
      onError: (err) => {
        return alertService.error({
          title: 'Register shop failed',
          message: err?.message
        })
      }
    }
  })

  const handleRegisterSuccess = (res) => {
    const data = res?.data?.data
    const api_key = data?.api_key
    if (data?.api_key) {
      setSuccessUrl(api_key)
      setTimeout(() => {
        close()
      }, TIME_COUNT_DOWN)
    }
    alertService.success({
      title: 'Register shop success',
      message: 'Register shop success'
    })
  }

  const onFinish = async (data) => {
    // registerShop({
    //   payload: data
    // })
    console.log(data)
  }

  const handleCheckExistedShop = async () => {
    const username = getValues('username')
    if (!username) return
    const res = await checkExistedShop({
      payload: {
        username: getValues('username')
      }
    })
    const { is_exist } = res?.data?.data
    if (is_exist) {
      alertService.error({
        title: 'Shop ID already exists',
        message: 'Please enter a different shop ID'
      })
      setExisted()
    } else {
      setNotExisted()
      trigger()
    }
  }

  const handleUploadImage = async (e) => {
    const file = e
    const formData = new FormData()
    formData.append('shop_image', file)
    uploadImage({
      payload: formData
    })
  }

  useEffect(() => {
    if (!successUrl) return

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [successUrl])

  if (successUrl) {
    return (
      <div className='text-center p-4'>
        <p className='text-xs font-medium mb-2'>Shop registered successfully!</p>
        <CustomButtonCopy
          textToCopy={successUrl}
          classNameContent='text-md font-bold border border-border rounded-md p-2 w-fit max-w-none'
        >
          {successUrl}
        </CustomButtonCopy>
        <p className='mt-4 text-gray-500 text-xs'>
          This dialog will close automatically in {countdown} second{countdown !== 1 ? 's' : ''}.
        </p>
      </div>
    )
  }

  return (
    <div>
      <FormWrapper methods={methods} className='flex flex-col gap-3' onSubmit={onFinish}>
        <div className='flex gap-4 items-center'>
          <CustomFormItem name='username' label='User Name' className='flex-1'>
            <CustomInput placeholder='Enter shop id' onChange={() => reset()} />
          </CustomFormItem>
          <CustomButton
            onClick={handleCheckExistedShop}
            disabled={!getValues('username') || status !== 'not-checked'}
            loading={isCheckingExistedShop}
            className={`min-w-[5rem] ${
              status === 'not-existed' ? 'bg-success' : status === 'existed' ? 'bg-primary' : 'bg-primary' // hoặc giữ mặc định
            }`}
          >
            {status === 'not-existed' ? <CheckIcon size={16} /> : 'Check'}
          </CustomButton>
        </div>

        <div className='flex gap-4 items-center mt-4'>
          <CustomFormItem name='shop_name' label='Shop name' className='flex-1'>
            <CustomInput placeholder='Enter shop name' />
          </CustomFormItem>
          <CustomFormItem name='password' label='Password' className='flex-1'>
            <CustomInputPassword placeholder='Enter password' />
          </CustomFormItem>
        </div>

        <div className='flex gap-4 items-center mt-4'>
          <CustomFormItem name='representative' label='Representative' className='flex-1'>
            <CustomInput placeholder='Enter representative' />
          </CustomFormItem>

          <CustomFormItem name='email' label='Email' className='flex-1'>
            <CustomInput placeholder='Enter email' />
          </CustomFormItem>
        </div>

        <div className='flex gap-4 items-center mt-4'>
          <CustomFormItem name='commission_rate' label='Commission Rate' className='flex-1'>
            <CustomInputNumber
              placeholder='Enter commission Rate'
              suffix={SYMBOL_CURRENCY.PERCENT}
              min={0}
              stepper={0.1}
            />
          </CustomFormItem>

          <CustomFormItem name='commission_rate_withdraw' label='Commission rate withdraw' className='flex-1'>
            <CustomInputNumber
              placeholder='Enter rate withdraw'
              suffix={SYMBOL_CURRENCY.PERCENT}
              min={0}
              stepper={0.1}
            />
          </CustomFormItem>
        </div>

        <div className='flex justify-between mt-4 gap-6'>
          <CustomFormItem methods={methods} name='insurance_money' label='Insurance Money' className='w-1/2'>
            <CustomInputNumber placeholder='Enter insurance money' suffix={SYMBOL_CURRENCY.WON} min={0} stepper={100} />
          </CustomFormItem>
          <div className='w-1/2'></div>
        </div>

        <div className='flex justify-between mt-4 gap-6'>
          <CustomFormItem methods={methods} name='is_active_otp' className='w-full'>
            <CustomSwitch title='OTP Google Active' />
          </CustomFormItem>
        </div>

        <div className='mt-4 w-full'>
          <UploadImage onChange={handleUploadImage} label='Shop Image' />
        </div>

        <div className='flex justify-end'>
          <CustomButton
            type='button'
            className='mt-4  font-bold w-[10rem]'
            disabled={status === 'existed' || status === 'not-checked' || !formState.isValid || isRegisteringShop}
            onClick={methods.handleSubmit(onFinish)}
          >
            Register
          </CustomButton>
        </div>
      </FormWrapper>
    </div>
  )
}
