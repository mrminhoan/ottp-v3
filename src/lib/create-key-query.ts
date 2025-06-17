import { TQueryKey } from '@/tanstack-query/react-query.types'

export const createKeyQuery = <P>(data: TQueryKey<P>) => {
  const { queryKey, payload } = data
  if (!payload) return queryKey
  return [
    ...queryKey,
    JSON.stringify(Object.fromEntries(Object.entries(payload).filter(([_key, value]) => value !== null)))
  ]
}
