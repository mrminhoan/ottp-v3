import { useQuery } from '@tanstack/react-query'
import { IParameter, TResult } from './react-query.types'
import { useEffect, useState } from 'react'
import { createKeyQuery } from '@/lib/create-key-query'
import { IResponse } from '@/models/interface/api-response-model'

export const useCustomQuery = <T, P>(parameter?: IParameter<T, P, 'query'>): TResult<T, P, 'query'> => {
  const { queryKey, fetcher, props = {}, ...rest } = parameter!
  const { onSuccess, payload } = props || {}
  const [localData, setLocalData] = useState<IResponse<T>>(null)

  const data = useQuery({
    ...rest,
    queryKey: createKeyQuery({
      queryKey,
      payload
    }),
    // staleTime: 5 * 60 * 1000,
    queryFn: () => fetcher(props)
  })

  const { data: response } = data

  useEffect(() => {
    if (response && onSuccess) {
      setLocalData(onSuccess(response))
    }
    setLocalData(response)
  }, [response])

  return {
    ...data,
    data: localData
  } as TResult<T, P, 'query'>
}
