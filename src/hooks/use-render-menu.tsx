import { useMemo } from 'react'

export const useRenderMenu = () => {
  const menu = useMemo(() => {
    return []
  }, [])

  return menu
}
