import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '../../button'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  asChild?: boolean
  loading?: boolean
  icon?: React.ElementType
  iconRight?: React.ElementType
  classNameContainer?: string
  classNameContent?: string
  classNameIcon?: string
  iconSize?: number
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant,
      size = 'sm',
      asChild = false,
      loading,
      icon,
      iconRight,
      children,
      type = 'button',
      classNameContent,
      classNameIcon,
      iconSize = 16,
      disabled,
      classNameContainer,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading
    const isFilter = className?.includes('filter')
    const heightClass = isFilter ? 'h-7' : 'h-8'

    const LeftIcon = icon
    const RightIcon = iconRight
    return (
      <Comp ref={ref} data-slot='button' disabled={isDisabled} type={type} {...props} className={classNameContainer}>
        <div className={cn(buttonVariants({ variant, size }), className, `relative rounded-md ${heightClass}`)}>
          {loading && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='h-4 w-4 animate-spin' />
            </div>
          )}

          <div className={cn('flex items-center justify-center  gap-2 w-full', loading && 'invisible')}>
            {LeftIcon && (
              <span className='inline-flex items-center justify-center w-full'>
                <LeftIcon size={iconSize} className={cn('align-middle', classNameIcon)} />
              </span>
            )}

            {children ? <span className={cn('text-xs font-medium', classNameContent)}>{children}</span> : null}

            {RightIcon && (
              <span className='inline-flex items-center justify-center w-full'>
                <RightIcon size={iconSize} className={cn('align-middle', classNameIcon)} />
              </span>
            )}
          </div>
        </div>
      </Comp>
    )
  }
)

CustomButton.displayName = 'CustomButton'
