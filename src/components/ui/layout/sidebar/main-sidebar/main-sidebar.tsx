import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar'
import { TMenu } from '@/models/types'
import { RenderSidebar } from '../render-sidebar'

interface IProps {
  routes: Partial<TMenu>
}

function MainSidebar(props: IProps) {
  const { routes } = props
  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarContent className='px-2'>
        <RenderSidebar routes={routes.children} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default MainSidebar
