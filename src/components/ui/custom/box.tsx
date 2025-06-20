import { cn } from '@/lib/utils'

interface IProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export default function Box(props: IProps) {
  const { children, title, className } = props
  return (
    <div className={cn('bg-surface rounded-md p-4 shadow-2xl w-full', className)}>
      <p>{title}</p>
      {children}
    </div>
  )
}
