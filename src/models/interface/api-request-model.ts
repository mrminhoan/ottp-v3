import { AxiosRequestConfig } from 'axios'
import { IResponse } from './api-response-model'

export interface IApiRequest<T = any, TData = any> extends AxiosRequestConfig {
  url: string
  payload?: Partial<T> | T
  baseURL?: string
  headers?: {
    [key: string]: string | number
  }
  toResponse?: Function
  toRequest?: Function
  onSuccess?: (data: IResponse<TData>) => IResponse<TData>
  onError?: (error: any) => any
  mockData?: any
}
