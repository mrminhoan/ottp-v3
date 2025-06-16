import MainSidebar from '@/components/ui/layout/sidebar/main-sidebar/main-sidebar'
import { Outlet } from 'react-router-dom'
import routes from '@/routes/init-routes'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <MainSidebar routes={routes[0]} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
