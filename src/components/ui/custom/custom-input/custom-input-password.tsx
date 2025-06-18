import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { CustomInput } from './custom-input'

type TProps = React.ComponentProps<'input'>

export const CustomInputPassword = (props: TProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  return (
    <div className='relative'>
      <CustomInput {...props} type={isVisible ? 'text' : 'password'} />
      <button
        className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10'
        type='button'
        onClick={toggleVisibility}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        aria-controls='password'
      >
        {isVisible ? <EyeOffIcon size={16} aria-hidden='true' /> : <EyeIcon size={16} aria-hidden='true' />}
      </button>
    </div>
  )
}
