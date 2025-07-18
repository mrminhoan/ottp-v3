import { SOCKET_ID } from '@/constants'
import { MainLayout } from '@/layout/main-layout'
import { UserStore } from '@/service/pages/users'
import { socketService } from '@/service/socket/socket.service'
import { useNotificationSocket } from '@/hooks/use-notification-socket'

function MainPage() {
  socketService.connect(SOCKET_ID.NOTIFICATION, UserStore.getAccessToken(), import.meta.env.VITE_WS_URL)
  useNotificationSocket()
  return <MainLayout />
}

export default MainPage
