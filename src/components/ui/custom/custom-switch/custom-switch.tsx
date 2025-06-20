import * as React from 'react'
import { Switch } from '@/components/animate-ui/base/switch'
import { Label } from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

type CustomSwitchProps = React.ComponentPropsWithoutRef<typeof Switch> & {
  title?: string
  classNameTitle?: string
}

const CustomSwitch = React.forwardRef<React.ElementRef<typeof Switch>, CustomSwitchProps>((props, ref) => {
  const { title, classNameTitle, ...rest } = props
  let id = props?.id
  if (!id) {
    id = props?.name
  }
  return (
    <div className='flex items-center gap-2'>
      {title && (
        <Label htmlFor={id} className={cn('text-xs text-label text-[10px] cursor-pointer', classNameTitle)}>
          {title}
        </Label>
      )}
      <Switch ref={ref} id={id} {...rest} />
    </div>
  )
})

CustomSwitch.displayName = 'CustomSwitch'

export { CustomSwitch }
