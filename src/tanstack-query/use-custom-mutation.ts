import { useCallback, useRef } from 'react'
import { TOptionMutation, TReturnTypeMutation } from './react-query.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCustomMutation = <T, P>(parameter?: TOptionMutation<T, P>): TReturnTypeMutation<T, P> => {
  const { props, inValidationKey, fetcher, onSuccess: handleSuccess, ...rest } = parameter!

  const refValid = useRef(inValidationKey)
  refValid.current = inValidationKey
  const queryCache = useQueryClient()
  const refreshCache = useCallback(() => {
    const queryKey = refValid.current
    if (queryKey?.length) {
      queryCache.invalidateQueries({ queryKey })
    }
  }, [])

  // if (props?.onError) {
  //   console.log(props?.onError)
  // }

  const data = useMutation({
    mutationFn: (params) => fetcher({ ...props, ...params }),
    onSuccess: (data, variables, context) => {
      refreshCache()
      handleSuccess?.(data, variables, context)
    },

    onError: props?.onError,
    ...rest
  })
  return {
    ...data,
    refreshCache
  }
}
