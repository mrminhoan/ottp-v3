import { HEADER } from '@/constants/header'
import { UserStore } from '@/service/pages/users'

const setHeader = (headers, key, value) => {
  headers[key] = value
}

const formatHeaders = (headers) => {
  // setHeader(headers, HEADER.X_API_KEY, apiKey)
  if (UserStore.getAccessToken()) {
    setHeader(headers, HEADER.AUTHORIZATION, `Bearer ${UserStore.getAccessToken()}`)
  }
}

export const HeaderService = { formatHeaders }
