import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar'
import { TMenu } from '@/models/types'
import { RenderSidebar } from '../render-sidebar'
import { ImageCdn } from '@/components/ui/custom/custom-image/image-cdn'
import { Avatar } from '@/components/ui/custom/custom-avatar/avatar'
import avatar from '@/assets/icons/avatar2.jpg'

interface IProps {
  routes: Partial<TMenu>
}

function MainSidebar(props: IProps) {
  const { routes } = props
  const { open } = useSidebar()
  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <div className='flex items-center justify-between'>
          {open && <ImageCdn src='/images/logo.png' alt='logo' imageClassName='w-[7rem]' />}
          <SidebarTrigger />
        </div>

        <div>
          <Avatar src={avatar} title='John Doe' />
        </div>
      </SidebarHeader>
      <SidebarContent className='px-2'>
        <RenderSidebar routes={routes.children} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default MainSidebar
