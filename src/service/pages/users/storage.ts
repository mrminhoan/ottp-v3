import { STORAGE_KEY } from '@/constants/storage'
import { getStoreBrowser } from './infrastructure'

export const UserStorage = {
  get() {
    try {
      const raw = getStoreBrowser().getItem(STORAGE_KEY.USER_PROFILE)
      if (!raw) return {}
      return JSON.parse(raw)
    } catch (error) {
      console.error(error)
      return {}
    }
  },

  set(data: any) {
    try {
      getStoreBrowser().setItem(STORAGE_KEY.USER_PROFILE, JSON.stringify(data))
    } catch (error) {
      console.error(error)
    }
  },

  clear() {
    try {
      getStoreBrowser().removeItem(STORAGE_KEY.USER_PROFILE)
    } catch (error) {
      console.error(error)
    }
  },

  getAccessToken() {
    return this.get()[STORAGE_KEY.ACCESS_TOKEN] || null
  },

  getRefreshToken() {
    return this.get()[STORAGE_KEY.REFRESH_TOKEN] || null
  },

  setAccessToken(token: string) {
    const profile = this.get()
    this.set({ ...profile, access_token: token })
  },

  setRefreshToken(token: string) {
    const profile = this.get()
    this.set({ ...profile, refresh_token: token })
  },

  clearCredential() {
    this.clear()
  },
  getTimeZone(): string | null {
    return localStorage.getItem(STORAGE_KEY.UTC)
  },

  setTimeZone(timezone: string) {
    localStorage.setItem(STORAGE_KEY.UTC, timezone)
  }
}
