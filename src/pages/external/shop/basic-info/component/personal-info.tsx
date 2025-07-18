import { CustomFormItem } from '@/components/ui/custom/custom-form/custom-form-item/custom-form-item'
import { CustomInput } from '@/components/ui/custom/custom-input'
import { UseFormReturn } from 'react-hook-form'

interface Iprops<T = any> {}
export const PersonalInfo = (props: Iprops) => {
  return (
    <div>
      <CustomFormItem name='username' label='User Name' className='flex-1'>
        <CustomInput placeholder='Enter shop id' />
      </CustomFormItem>

       <CustomFormItem name='username' label='User Name' className='flex-1'>
        <CustomInput placeholder='Enter shop id' />
      </CustomFormItem>
    </div>
  )
}
