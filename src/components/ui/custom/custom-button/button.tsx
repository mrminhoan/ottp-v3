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
  classNameContent?: string
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
      disabled,
      classNameContent,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading

    const LeftIcon = icon
    const RightIcon = iconRight

    return (
      <Comp
        ref={ref}
        data-slot='button'
        className={cn(buttonVariants({ variant, size }), className, 'relative rounded-md')}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className='h-4 w-4 animate-spin' />
          </div>
        )}

        <div className={cn('flex items-center justify-center gap-2', loading && 'invisible')}>
          {LeftIcon && (
            <span className='inline-flex items-center justify-center'>
              <LeftIcon size={16} className='align-middle' />
            </span>
          )}

          {children ? <span className={cn('inline-flex items-center', classNameContent)}>{children}</span> : null}

          {RightIcon && (
            <span className='inline-flex items-center justify-center'>
              <RightIcon size={16} className='align-middle' />
            </span>
          )}
        </div>
      </Comp>
    )
  }
)

CustomButton.displayName = 'CustomButton'
