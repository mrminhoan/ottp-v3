import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'

export function ExternalShopHeader() {
  const { isMobile } = useSidebar()
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div >{isMobile && <SidebarTrigger />}</div>
    </header>
  )
}
