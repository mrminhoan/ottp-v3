import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Form } from '../../form'

export interface IFormChildrenProps {
  height?: number
  methods?: UseFormReturn<any>
}

export interface IPropsForm<T> {
  methods: UseFormReturn<T>
  children?: React.ReactNode | ((props: IFormChildrenProps) => React.ReactNode)
  className?: string
  name?: string
  onSubmit?: (data: T) => void
}

// ✅ Use forwardRef
export const CustomForm = React.forwardRef<HTMLFormElement, IPropsForm<any>>(
  ({ methods, children, className, onSubmit }, ref) => {
    return (
      <Form {...methods}>
        <form
          ref={ref} // ✅ Gắn ref vào form
          onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
          className={cn('w-full', className)}
        >
          {typeof children === 'function' ? children({ methods }) : children}
        </form>
      </Form>
    )
  }
)

CustomForm.displayName = 'CustomForm'
