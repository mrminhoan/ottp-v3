import { STORAGE_KEY } from '@/constants/storage'
import { UserStorage } from './storage'
import { UserProfileModel } from '@/models/class'

export const UserStore = {
  getProfile(): UserProfileModel | null {
    const raw = UserStorage.get()
    return raw?.[STORAGE_KEY.USER_PROFILE] || null
  },

  setProfile(user: UserProfileModel) {
    const profile = UserStorage.get()
    UserStorage.set({
      ...profile,
      [STORAGE_KEY.USER_PROFILE]: user
    })
  },

  getAccessToken(): string | null {
    return UserStorage.getAccessToken()
  },

  setAccessToken(token: string) {
    UserStorage.setAccessToken(token)
  },

  getRefreshToken(): string | null {
    return UserStorage.getRefreshToken()
  },

  setRefreshToken(token: string) {
    UserStorage.setRefreshToken(token)
  },

  getTimeZone(): string | null {
    return UserStorage.getTimeZone()
  },

  setTimeZone(timezone: string) {
    UserStorage.setTimeZone(timezone)
  },

  clear() {
    UserStorage.clear()
  },

  clearCredential() {
    UserStorage.clearCredential()
  },

  setCredentials(data: Partial<Record<string, any>>) {
    const profile = UserStorage.get()
    UserStorage.set({
      ...profile,
      [STORAGE_KEY.ACCESS_TOKEN]: data[STORAGE_KEY.ACCESS_TOKEN] || profile[STORAGE_KEY.ACCESS_TOKEN],
      [STORAGE_KEY.REFRESH_TOKEN]: data[STORAGE_KEY.REFRESH_TOKEN] || profile[STORAGE_KEY.REFRESH_TOKEN],
      [STORAGE_KEY.USER_PROFILE]: data[STORAGE_KEY.USER_PROFILE] || profile[STORAGE_KEY.USER_PROFILE]
    })
  },

  isLoggedIn(): boolean {
    return !!this.getAccessToken()
  }
}
