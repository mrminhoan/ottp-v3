import { UserStore } from '@/service/pages/users/store'

export const forceLogout = () => {
  UserStore.clearCredential()
  window.location.href = '/login'
}
