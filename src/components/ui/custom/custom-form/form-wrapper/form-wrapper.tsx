import React, { ComponentType, ReactNode } from 'react'
import { OpacityAnimation } from '@/components/ui/custom/custom-frammer-motion'
import { cn } from '@/lib/utils'
import { CustomForm, IFormChildrenProps, IPropsForm } from '../custom-form'
import { UseFormReturn } from 'react-hook-form'

type TF = (props: IFormChildrenProps) => React.ReactNode
type IProps<T> = IPropsForm<T> & {
  formWrapperProps?: {
    Skeleton: ComponentType
    showSkeleton: boolean
    wrapperClassName?: string
    opacityClassName?: string
  }
  children?: ReactNode | TF
  methods: UseFormReturn<T>
}

export function FormWrapper<T>(props: IProps<T>) {
  const { formWrapperProps, children, methods, ...rest } = props
  const { showSkeleton, Skeleton, wrapperClassName, opacityClassName } = formWrapperProps || {}

  return (
    <OpacityAnimation keyMotion={rest.name} className={opacityClassName}>
      <div className={cn('h-full', wrapperClassName)}>
        {showSkeleton ? (
          <div className={'min-h-full'}>
            <Skeleton />
          </div>
        ) : (
          <>
            <CustomForm {...rest} className={cn('min-h-full h-auto w-full relative', rest.className)} methods={methods}>
              {({ height }) => (typeof children === 'function' ? children({ height }) : children)}
            </CustomForm>
          </>
        )}
      </div>
    </OpacityAnimation>
  )
}
