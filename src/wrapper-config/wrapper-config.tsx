import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { SplashScreen } from '@/components/ui/custom/splash-screen/splash-screen'
import { BrowserRouter } from 'react-router-dom'
import '@/styles/global.css'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { AppConfigProvider } from '@/components/theme/theme-provider'
// import { loadI18n } from '@/i18n'
// import { GlobalPopupWindowProvider } from '@/context/exter-windows/external-windows.provider'
// import { DialogProvider } from '@/context/dialog-provider'
// import { SplashScreen } from '@/components/ui/custom/splash-screen/splash-screen'
// import { Toaster } from '@/components/ui/sonner'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { LOCAL_STORAGE_KEY } from '@/constants'
// import { UserIdentity, UserStore } from '@/service/axios/pages/user'
// import socketService from '@/service/socket/socket.service'

interface IProps extends React.PropsWithChildren {
  id?: string
}

export const WrapperConfig = async (props: IProps) => {
  // await loadI18n()
  // const queryClient = new QueryClient()

  // const storedTimezone = UserStore.getTimeZone()
  // if (!storedTimezone) {
  //     UserStore.setTimeZone('+9')
  // }

  const { id = 'root', children } = props

  const root = createRoot(document.getElementById(id)!)

  root.render(
    <StrictMode>
      <SplashScreen />
    </StrictMode>
  )

  setTimeout(() => {
    root.render(
      <StrictMode>
        <BrowserRouter>{children}</BrowserRouter>
      </StrictMode>
    )
  }, 500)
}
