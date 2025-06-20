import MainSidebar from '@/components/ui/layout/sidebar/main-sidebar/main-sidebar'
import { Outlet } from 'react-router-dom'
import routes from '@/routes/init-routes'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { MainHeader } from '@/components/ui/layout/header/main-header'
import { Separator } from '@/components/ui/separator'

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <MainSidebar routes={routes[0]} />
      <SidebarInset className='overflow-hidden '>
        <MainHeader />
        <Separator />
        <div className='container'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
