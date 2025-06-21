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
import { useShopStore } from '@/store'
import { ModeToggle } from '@/components/ui/mode-toggle'

interface IProps {
  routes: Partial<TMenu>
}

function MainSidebar(props: IProps) {
  const { routes } = props
  const { open } = useSidebar()
  const shopStore = useShopStore()

  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <div className='flex items-center justify-between'>
          {open && <ImageCdn src='/images/logo.png' alt='logo' imageClassName='w-[7rem]' />}
          <SidebarTrigger />
        </div>

        <ModeToggle />

        <div className='flex items-center gap-2'>
          <Avatar src={avatar} title='John Doe' className='h-8 w-8' />
          <div>
            <p className='text-xs font-semibold'>{shopStore.shop_name}</p>
            <p className='text-xs text-muted-foreground'>({shopStore.username})</p>
          </div>
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
