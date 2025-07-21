import { useEffect } from 'react'
import { socketService } from '@/service/socket/socket.service'
import { alertService } from '@/components/ui/custom/custom-toast/alert.service'
import { SOCKET_ID } from '@/constants/socket'

// Interface cho notification message
interface NotificationRequest {
  message: string
  tether: number
  amount: number
  username: string
  txn_hash: string
  expiry_time: string
}

export const useNotificationSocket = () => {
  useEffect(() => {
    const handleNotificationRequest = (data: NotificationRequest) => {
      try {
        const audio = new Audio('/sounds/1.mp3')
        audio.volume = 0.5
        audio.play().catch(console.warn)
        alertService.notiDeposit(data)
      } catch (error) {
        alertService.error({
          message: 'Deposit notification failed',
          title: 'Error'
        })
      }
    }

    socketService.on(SOCKET_ID.NOTIFICATION, 'notification_request', handleNotificationRequest)

    return () => {
      socketService.off(SOCKET_ID.NOTIFICATION, 'notification_request', handleNotificationRequest)
    }
  }, [socketService.getSocket(SOCKET_ID.NOTIFICATION)])
}
