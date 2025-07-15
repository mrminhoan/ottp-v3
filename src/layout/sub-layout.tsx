import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'

export const SubLayout = () => {
  return (
    <SidebarProvider>
        <Outlet />
    </SidebarProvider>
  )
}
