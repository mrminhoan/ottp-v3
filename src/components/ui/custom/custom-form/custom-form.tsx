import { ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Form } from '../../form'

export interface IFormChildrenProps {
  height?: number
  methods?: UseFormReturn<any>
}

export interface IPropsForm<T> {
  methods: UseFormReturn<T>
  children?: ReactNode | ((props: IFormChildrenProps) => ReactNode)
  className?: string
  name?: string
  onSubmit?: (data: T) => void
}

export function CustomForm<T>({ methods, children, className, onSubmit }: IPropsForm<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined} className={cn('w-full', className)}>
        {typeof children === 'function' ? children({ methods }) : children}
      </form>
    </Form>
  )
}
