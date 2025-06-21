import axios from 'axios'
import { omit } from 'lodash'
// import socketService from '../socket/socket.service'
import { forceLogout } from '@/lib/force-logout'
import { IApiRequest } from '@/models/interface/api-request-model'
import { IResponse } from '@/models/interface/api-response-model'
import { HeaderService } from './headers'
import { LoginService } from '../pages/login/login.service'
import { UserStore } from '../pages/users/store'
import { socketService } from '../socket/socket.service'
import { SOCKET_ID } from '@/constants/socket'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL_PRODUCTION,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const BaseService = {
  get<T = any>({
    url,
    payload,
    baseURL,
    headers,
    onError,
    toResponse,
    mockData
  }: Partial<IApiRequest>): Promise<IResponse<T>> {
    return axiosInstance
      .get(url, {
        params: payload || {},
        baseURL: baseURL,
        headers: headers || {}
      })
      .then(async (res) => {
        let dataMapping: any = mockData ? mockData : res.data
        // let dataMapping: any = mockData
        if (toResponse) {
          if (Array.isArray(dataMapping)) {
            dataMapping = dataMapping.map((item) => toResponse(item))
          } else {
            dataMapping = toResponse(dataMapping)
          }
        }
        return Promise.resolve({ ...res, data: dataMapping })
      })
      .catch((error) => {
        onError?.(error)
        return Promise.reject(error)
      })
  },
  post<T = any, TData = any>({
    url,
    payload,
    headers,
    onError,
    toRequest,
    toResponse,
    mockData
  }: Partial<IApiRequest<TData>>): Promise<IResponse<T>> {
    if (toRequest) {
      payload = toRequest(payload)
    }

    return axiosInstance
      .post(url, payload, {
        headers: headers || {}
      })
      .then(async (res) => {
        let dataMapping: any = mockData ? mockData : res.data?.data
        if (toResponse) {
          if (dataMapping && dataMapping?.data) {
            const newDataMapping = dataMapping.data
            if (Array.isArray(newDataMapping)) {
              dataMapping = newDataMapping.map((item) => toResponse(item))
            } else {
              dataMapping = toResponse(newDataMapping)
            }
          }
          if (Array.isArray(dataMapping)) {
            dataMapping = dataMapping.map((item) => toResponse(item))
          } else {
            dataMapping = toResponse(dataMapping)
          }
        }

        return Promise.resolve({
          ...res,
          data: {
            data: dataMapping,
            totalItem: res.data?.data?.total_count,
            totalPages: res.data?.data?.total_pages
          }
        })
      })
      .catch((error) => {
        onError?.(error)
        let dataMapping: any = mockData ? mockData : []
        if (toResponse) {
          if (Array.isArray(dataMapping)) {
            dataMapping = dataMapping.map((item) => {
              return toResponse(item)
            })
          } else {
            dataMapping = toResponse(dataMapping)
          }
        }
        // return Promise.reject(error)
        return Promise.resolve({
          ...error,
          data: dataMapping
        })
      })
  }
}

const ongoingRequests = []

axiosInstance.interceptors.request.use((config) => {
  const headers = omit(config.headers, 'Content-Type') as any
  HeaderService.formatHeaders(headers)
  headers['Content-Type'] = config.headers['Content-Type']
  const requestId = Math.random().toString(36).substring(7)
  config['requestId'] = requestId
  ongoingRequests.push(requestId)
  return { ...config, headers }
})

let isRetry = false
let subscribers: Array<(token: string) => void> = []

function onAccessTokenFetched(accessToken: string) {
  subscribers.forEach((callback) => callback(accessToken))
  subscribers = []
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback)
}

axiosInstance.interceptors.response.use(
  async (response) => {
    const { data, config } = response
    if (data?.code && data.code !== 0) {
      if (data.code === 401) {
        if (data?.msg === 'Invalid or expired refresh token') {
          forceLogout()
          return
        }
        if (!isRetry) {
          isRetry = true
          try {
            const res = await LoginService.refreshToken({
              payload: {
                refresh_token: UserStore.getRefreshToken()
              }
            })
            if (res) {
              UserStore.setAccessToken(res?.data?.data?.access_token)
              UserStore.setRefreshToken(res?.data?.data?.refresh_token)
            }

            const accessToken = res?.data?.data?.access_token

            socketService.connect(SOCKET_ID.NOTIFICATION, accessToken, import.meta.env.VITE_SOCKET_URL)

            isRetry = false
            onAccessTokenFetched(accessToken)

            config.headers['Authorization'] = `Bearer ${accessToken}`

            return axiosInstance({ ...config })
          } catch (error) {
            isRetry = false
            setTimeout(() => {
              forceLogout()
            }, 1000)
            console.log('Invalid access. Please login again.', error)
            throw new Error('Invalid access. Please login again.')
          }
        } else {
          return new Promise((resolve) => {
            // add the subscriber to the list
            addSubscriber((accessToken) => {
              config.headers['Authorization'] = `Bearer ${accessToken}`
              resolve(axiosInstance(config))
            })
          })
        }
      }

      const error = new Error(data.msg || 'Unknown error from server')
      ;(error as any).response = response
      return Promise.reject(error)
    }

    return Promise.resolve(response)
  },
  async (err) => {
    return Promise.reject(err)
  }
)
