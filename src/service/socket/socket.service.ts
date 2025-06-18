import { io, Socket } from 'socket.io-client'

class SocketService {
  private sockets: Map<string, Socket> = new Map()

  connect(id: string, token: string, url: string) {
    if (this.sockets.has(id)) {
      console.warn(`⚠️ Socket[${id}] already connected. Skip.`)
      return
    }

    const socket = io(url, {
      auth: { token },
      transports: ['websocket']
    })

    socket.on('connect', () => {
      console.log(`✅ Socket[${id}] connected:`, socket.id)
    })

    socket.on('disconnect', (reason) => {
      console.log(`❌ Socket[${id}] disconnected:`, reason)
    })

    this.sockets.set(id, socket)
  }

  getSocket(id: string): Socket | undefined {
    return this.sockets.get(id)
  }

  disconnect(id: string) {
    const socket = this.sockets.get(id)
    socket?.disconnect()
    this.sockets.delete(id)
  }

  emit(id: string, event: string, data: any) {
    this.sockets.get(id)?.emit(event, data)
  }

  on(id: string, event: string, callback: (...args: any[]) => void) {
    this.sockets.get(id)?.on(event, callback)
  }

  off(id: string, event: string, callback?: (...args: any[]) => void) {
    const socket = this.sockets.get(id)
    if (callback) socket?.off(event, callback)
    else socket?.off(event)
  }
}

export const socketService = new SocketService()