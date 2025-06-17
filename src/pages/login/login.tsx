import { StarsBackground } from '@/components/animate-ui/backgrounds/stars'
import { LoginForm } from './login-form/login-form'

const Login = () => {
  return (
    <div className='flex min-h-screen w-full '>
      <StarsBackground className='absolute inset-0 flex items-center justify-center rounded-xl'>
        <LoginForm />
      </StarsBackground>
    </div>
  )
}

export default Login
