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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/animate-ui/radix/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import SelectTimezone from '@/shared/components/selects/select-time-zome'
import LanguageMenu from '@/shared/components/selects/select-language'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'

interface IProps {
  routes: Partial<TMenu>
}

function MainSidebar(props: IProps) {
  const [isOpenProfile, setIsOpenProfile] = useState(false)

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

        {
          open && (
            <DropdownMenu open={isOpenProfile} onOpenChange={setIsOpenProfile}>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center gap-2 justify-between'>
                  <div className='flex items-center gap-2'>
                    <Avatar src={avatar} title='John Doe' className='h-8 w-8' />
                    <div>
                      <p className='text-xs font-semibold'>{shopStore.shop_name}</p>
                      <p className='text-xs text-muted-foreground'>({shopStore.username})</p>
                    </div>
                  </div>

                  <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpenProfile ? 'rotate-[-90deg]' : ''}`} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='right' className='flex flex-col gap-2'>
                <SelectTimezone />
                <LanguageMenu className='bg-background' isShowLabel={true} />
                <ModeToggle />
              </DropdownMenuContent>
            </DropdownMenu>

          )
        }
      </SidebarHeader>

      <Separator className='mb-5'/>

      <SidebarContent className='px-2'>
        <RenderSidebar routes={routes.children} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default MainSidebar

{/* <div className='flex items-center gap-2'>
<Avatar src={avatar} title='John Doe' className='h-8 w-8' />
<div>
  <p className='text-xs font-semibold'>{shopStore.shop_name}</p>
  <p className='text-xs text-muted-foreground'>({shopStore.username})</p>
</div>
</div> */}