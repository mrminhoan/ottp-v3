// import { UserIdentity } from '@/service/axios/pages/user/user-identity'

export const forceLogout = () => {
  // UserIdentity.clearCredential()
  window.location.href = '/login'
  window.location.reload()
}
