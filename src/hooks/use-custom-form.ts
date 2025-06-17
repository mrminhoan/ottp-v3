import { zodResolver } from '@hookform/resolvers/zod'
import setValueWithPath from 'lodash/set'
import { useMemo } from 'react'
import { FieldPath, FieldValues, useForm, UseFormProps } from 'react-hook-form'
import { ZodObject, ZodRawShape, ZodTypeAny } from 'zod'

export type TCustomUseFormProps<TFieldValues, TContext> = UseFormProps<TFieldValues, TContext> & {
  zodSchema?: ZodObject<ZodRawShape> | ZodTypeAny
  watches?: FieldPath<TFieldValues>[]
  startValueChange?: boolean
}

export function useCustomForm<TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props?: TCustomUseFormProps<TFieldValues, TContext>
) {
  const { zodSchema, watches, ...rest } = props || {}
  const methods = useForm({
    ...(zodSchema && { resolver: zodResolver(zodSchema) }),
    mode: 'onChange',
    ...rest
  })

  const dataWatches = useMemo((): TFieldValues => {
    return watches?.reduce((acc, key) => {
      setValueWithPath(acc, key, methods.watch(key))
      return acc
    }, methods.getValues())
  }, [watches ? methods.watch(watches) : null])

  return {
    methods: methods,
    ...methods,
    dataWatches
  }
}
