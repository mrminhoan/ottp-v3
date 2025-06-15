import { cn } from '@/lib/utils'
import { ComponentProps, FC, ReactNode, useState } from 'react'
import { CustomSpin } from '../custom-spin/custom-spin'

const CDN_PREFIX = 'https://cdn.example.com/'

interface IProps extends ComponentProps<'img'> {
  wrapClassName?: string
  isCdn?: boolean
  fallback?: ReactNode
}

export const ImageCdn: FC<IProps> = ({
  src = '',
  wrapClassName,
  isCdn = false,
  fallback = <div>Image not found</div>,
  ...restProps
}) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Xử lý src final
  const getFinalSrc = () => {
    if (!isCdn) return src
    if (src.startsWith('http') || src.startsWith('//')) return src
    return `${CDN_PREFIX}${src}`
  }

  const handleLoad = () => {
    setLoaded(true)
  }

  const handleError = () => {
    setError(true)
  }

  return (
    <div className={cn('flex items-center justify-center w-screen h-screen', wrapClassName)}>
      {!loaded && !error && <CustomSpin />}
      {!error ? (
        <img
          {...restProps}
          src={getFinalSrc()}
          onLoad={handleLoad}
          onError={handleError}
          className={!loaded ? 'hidden' : ''}
        />
      ) : (
        fallback
      )}
    </div>
  )
}
