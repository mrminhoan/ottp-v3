import { cn } from '@/lib/utils'

interface IProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export default function Box(props: IProps) {
  const { children, title, className } = props
  return (
    <div className={cn('bg-surface dark:bg-black/50 rounded-md p-4 shadow-2xl w-full', className)}>
      <p className='text-lg font-bold mb-4'>{title}</p>
      {children}
    </div>
  )
}
