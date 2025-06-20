import { useState } from 'react'

export type TCheckStatus = 'not-checked' | 'checking' | 'existed' | 'not-existed'

export const useCheckStatus = () => {
  const [status, setStatus] = useState<TCheckStatus>('not-checked')

  const reset = () => setStatus('not-checked')
  const setChecking = () => setStatus('checking')
  const setExisted = () => setStatus('existed')
  const setNotExisted = () => setStatus('not-existed')

  return {
    status,
    setStatus, // optional if you want raw access
    reset,
    setChecking,
    setExisted,
    setNotExisted
  }
}
