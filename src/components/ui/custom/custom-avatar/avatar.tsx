import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.ComponentProps<typeof AvatarBase> {
  src?: string
  title?: string
  fallbackClassName?: string
}

export const Avatar = ({ src, title, className, fallbackClassName, ...props }: AvatarProps) => {
  const getFallbackLetters = (title?: string) => {
    if (!title) return ''
    return title
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <AvatarBase className={cn('h-7 w-7 rounded-lg', className)} {...props}>
      {src && <AvatarImage src={src} alt={title || 'Avatar'} />}
      <AvatarFallback className={cn('rounded-lg', fallbackClassName)}>{getFallbackLetters(title)}</AvatarFallback>
    </AvatarBase>
  )
}
