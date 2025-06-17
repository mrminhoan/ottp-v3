import { STORAGE_KEY } from '@/constants'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'light' | 'system'

type AppConfigProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  themeStorageKey?: string
  defaultUtcOffset?: string
  utcStorageKey?: string
}

type AppConfigContextState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  utcOffset: string
  setUtcOffset: (offset: string) => void
}

const initialState: AppConfigContextState = {
  theme: 'system',
  setTheme: () => null,
  utcOffset: '+9',
  setUtcOffset: () => null
}

const AppConfigContext = createContext<AppConfigContextState>(initialState)

export function AppConfigProvider({
  children,
  defaultTheme = 'system',
  themeStorageKey = STORAGE_KEY.THEME,
  defaultUtcOffset = '+9',
  utcStorageKey = STORAGE_KEY.UTC
}: AppConfigProviderProps) {
  // Theme state
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem(themeStorageKey) as Theme) || defaultTheme)

  // UTC Offset state
  const [utcOffset, setUtcOffsetState] = useState<string>(() => {
    const raw = localStorage.getItem(utcStorageKey)
    return raw ? raw : defaultUtcOffset
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === themeStorageKey && e.newValue) {
        setThemeState(e.newValue as Theme)
      } else if (e.key === utcStorageKey && e.newValue) {
        setUtcOffsetState(e.newValue)
      }
    }

    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [themeStorageKey, utcStorageKey])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(themeStorageKey, newTheme)
      setThemeState(newTheme)
    },
    utcOffset,
    setUtcOffset: (offset: string) => {
      localStorage.setItem(utcStorageKey, offset.toString())
      setUtcOffsetState(offset)
    }
  }

  return <AppConfigContext.Provider value={value}>{children}</AppConfigContext.Provider>
}

export const useTheme = () => {
  const { theme, setTheme } = useContext(AppConfigContext)
  return { theme, setTheme }
}

export const useUtc = () => {
  const { utcOffset, setUtcOffset } = useContext(AppConfigContext)
  return { utcOffset, setUtcOffset }
}
