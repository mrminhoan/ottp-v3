import { cn } from '@/lib/utils'

interface Iprops {
  title: string
  children: React.ReactNode
  className?: string
  classNameKey?: string
  classNameValue?: string
}

export const KeyValueComp = (props: Iprops) => {
  const { title, children, className, classNameKey, classNameValue } = props
  return (
    <div className={cn('flex overflow-hidden rounded w-full', className)}>
      <span className={cn('text-xs flex items-center  bg-primary text-white font-semibold px-3 py-1', classNameKey)}>
        {title}
      </span>
      <span
        className={cn(
          ' flex-1 text-xs text-foreground font-medium bg-white border border-border px-3 py-1 border-l-0 rounded-r-md text-right',
          classNameValue
        )}
      >
        {children}
      </span>
    </div>
  )
}
