import { ImageCdn } from '../custom-image/image-cdn'

export const SplashScreen = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <ImageCdn className={'center-center'} src={'/images/logo.png'} alt={'splash logo'} width={150} height={150} />
    </div>
  )
}
