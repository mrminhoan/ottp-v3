import { useEffect } from 'react'
import { socketService } from '@/service/socket/socket.service'
import { alertService } from '@/components/ui/custom/custom-toast/alert.service'
import { SOCKET_ID } from '@/constants/socket'

// Interface cho notification message
interface NotificationRequest {
  message: string
  title?: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

export const useNotificationSocket = () => {
  useEffect(() => {
    const handleNotificationRequest = (data: NotificationRequest) => {
      console.log('📨 Received notification_request:', data)

      const { message, title, type = 'info' } = data

      // Play notification sound
      try {
        const audio = new Audio('/sounds/1.mp3')
        audio.volume = 0.5
        audio.play().catch(console.warn)
      } catch (error) {
        console.warn('⚠️ Could not play notification sound:', error)
      }

      alertService.info({ message, title })
    }

    socketService.on(SOCKET_ID.NOTIFICATION, 'notification_request', handleNotificationRequest)

    return () => {
      socketService.off(SOCKET_ID.NOTIFICATION, 'notification_request', handleNotificationRequest)
    }
  }, [socketService.getSocket(SOCKET_ID.NOTIFICATION)])
}
