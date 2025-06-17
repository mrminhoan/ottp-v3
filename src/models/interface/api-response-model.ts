import { AxiosResponse } from 'axios'

export interface IResponse<T = unknown> extends AxiosResponse<T> {
  code?: number
  data: T
  totalItem?: number
}

export interface IResponseData<T = unknown> {
  data?: T
  total_count?: number
  total_pages?: number
}
