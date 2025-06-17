import { TypingText } from '@/components/animate-ui/text/typing'
import { CustomButton } from '@/components/ui/custom/custom-button/button'
import { CustomFormItem, FormWrapper } from '@/components/ui/custom/custom-form'
import { CustomInput } from '@/components/ui/custom/custom-input'
import { useCustomForm } from '@/hooks/use-custom-form'
import { loginSchema, TLogin } from '@/models/schema/login.schema'
import { AuthService } from '@/service/pages'
import { CommonService } from '@/service/pages/common/common.service'
import LanguageMenu from '@/shared/components/selects/select-language'
import SelectTimezone from '@/shared/components/selects/select-time-zome'
import { useCustomMutation } from '@/tanstack-query/use-custom-mutation'
import { useCustomQuery } from '@/tanstack-query/use-custom-query'

export const LoginForm = () => {
  const {
    methods,
    setValue,
    formState: { isValid }
  } = useCustomForm<TLogin>({
    zodSchema: loginSchema,
    defaultValues: {
      username: '',
      password: '',
      ip: ''
    }
  })

  const { data: ipData } = useCustomQuery({
    queryKey: ['ip'],
    fetcher: CommonService.getMyIP,
    props: {
      onSuccess: (data) => {
        setValue('ip', data.data.ip)
        return data
      },
      onError: (err) => {
        console.log(err)
        // return cusToast.error({
        //   title: 'Error',
        //   description: err.response.data.msg
        // })
      }
    }
  })

  console.log({ ipData })

  const onFinish = async (data) => {
    await loginMutation({
      payload: {
        ...data
      }
    })
  }

  const { mutateAsync: loginMutation, isPending: isLoginPending } = useCustomMutation({
    fetcher: AuthService.login,
    onSuccess: async (data) => {
      //   handleSuccess(data)
      //   socketService.connect(data?.data?.data?.access_token)
      return data
    },
    onError: (err) => {
      console.log(err)
    },
    props: {
      onError: (err) => {
        console.log(err)
      }
    }
  })

  return (
    <div className='w-full max-w-md rounded-lg bg-[white] p-8 shadow'>
      <div className='mb-8 flex flex-col items-center'>
        <img src='/images/logo.png' alt='Logo' className='mb-4 w-20' />
        <TypingText text='Welcome to One Tether Pay!' inViewOnce={true} className='text-xl font-bold' />
      </div>

      <FormWrapper methods={methods} className='flex flex-col gap-3'>
        <CustomFormItem methods={methods} name='username' label='User Name'>
          <CustomInput placeholder='Enter ID' />
        </CustomFormItem>
        <CustomFormItem methods={methods} name='password' label='Password'>
          <CustomInput type='password' placeholder='Enter password' />
        </CustomFormItem>

        <div className='flex gap-2 w-full items-center'>
          <LanguageMenu className='flex-2' isShowLabel />
          <SelectTimezone className='flex-1' />
        </div>

        <CustomFormItem methods={methods} name='ip'>
          <CustomInput type='text' placeholder='IP' disabled className='text-center' />
        </CustomFormItem>

        <CustomButton
          type='submit'
          className='mt-4 w-full text-white font-bold'
          onClick={methods.handleSubmit(onFinish)}
          loading={isLoginPending}
          disabled={!isValid}
        >
          Login
        </CustomButton>
      </FormWrapper>
    </div>
  )
}
