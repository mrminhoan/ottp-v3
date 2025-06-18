export const SOCKET_ID = {
  NOTIFICATION: 'notification'
} as const

export type SocketId = (typeof SOCKET_ID)[keyof typeof SOCKET_ID]
