import { IApiRequest } from '@/models/interface/api-request-model'
import { IResponse } from '@/models/interface/api-response-model'
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'

export interface IErrorQuery extends Error {
  code: number
  [key: string]: Object | string | number | Symbol | BigInt
}

export type TTypeQuery = 'mutation' | 'query' | 'infinity'

export type TQueryKey<P> = {
  queryKey: QueryKey
  payload: Partial<P>
}

export type TResultQuery<T, P, Q extends TTypeQuery> = Q extends 'mutation'
  ? UseMutationResult<IResponse<T>, IErrorQuery, Partial<IApiRequest<P, T>>>
  : Q extends 'query'
    ? UseQueryResult<IResponse<T>, P>
    : UseInfiniteQueryResult<IResponse<T>, IErrorQuery>

export type PropsFetcher<T = any, P = any> = (_v: Partial<IApiRequest<P, T>>) => Promise<IResponse<T>>

export type TOptionsQuery<T, P, Q extends TTypeQuery> = (Q extends 'mutation'
  ? UseMutationOptions<IResponse<T>, IErrorQuery, Partial<IApiRequest<P, T>>>
  : Q extends 'query'
    ? UseQueryOptions<any, P>
    : Omit<UseInfiniteQueryOptions<IResponse<T>, IErrorQuery>, 'getNextPageParam' | 'initialPageParam'>) & {
  props?: Partial<IApiRequest<P, T>>
  fetcher?: PropsFetcher<T, P>
}
export type IParameter<T, P, Q extends TTypeQuery> = TOptionsQuery<T, P, Q>

export type TResult<T, P, Y extends TTypeQuery> = TResultQuery<T, P, Y>

// mutation
export type TCustomOptionMutation = {
  inValidationKey?: QueryKey
}

export type TReturnTypeMutation<T, P> = TResult<T, P, 'mutation'> & TResultCustomMutation
export type TOptionMutation<T, P> = IParameter<T, P, 'mutation'> & TCustomOptionMutation

export type TResultCustomMutation = {
  refreshCache: () => void
}
