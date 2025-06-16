import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../../sidebar'

interface IProps extends React.ComponentProps<typeof Sidebar> {
  sidebarHeader?: React.ReactNode
  sidebarContent?: React.ReactNode
  sidebarFooter?: React.ReactNode
}

function CustomSidebar({ ...props }: IProps) {
  const { sidebarHeader, sidebarContent, sidebarFooter } = props

  return (
    <Sidebar className='top-[--header-height] !h-[calc(100svh-var(--header-height))]' {...props}>
      {sidebarHeader && <SidebarHeader>{sidebarHeader}</SidebarHeader>}

      <SidebarContent className='flex flex-col gap-2' {...props}>
        {sidebarContent}
      </SidebarContent>

      {sidebarFooter && <SidebarFooter>{sidebarFooter}</SidebarFooter>}
    </Sidebar>
  )
}

export default CustomSidebar
