import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '../../sidebar'
import { ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { TMenu } from '@/models/types'
import { cn } from '@/lib/utils'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@/components/animate-ui/headless/accordion'
import React from 'react'

interface IProps {
  routes: Partial<TMenu>[]
}

export function RenderSidebar({ routes }: IProps) {
  const location = useLocation()

  const isActiveLink = (path?: string) => {
    if (!path) return false
    return location.pathname === path
  }

  const isActiveParent = (children?: Partial<TMenu>[]) => {
    if (!children?.length) return false
    return children.some((child) => isActiveLink(child.path) || isActiveParent(child.children))
  }

  const renderMenuItem = (item: Partial<TMenu>) => {
    const url = item.to || item.path
    const title = item.meta?.title
    const Icon = item.meta?.icon as any

    if (!title) return null

    const isActive = isActiveLink(url)
    const to = url + location.search
    return (
      <SidebarMenuSubItem key={url}>
        <SidebarMenuSubButton asChild>
          <div>
            {Icon && <Icon className={cn('w-4 h-4 mr-2')} />}
            <Link to={to} className={cn('transition-all duration-200 w-full', isActive && 'font-bold')}>
              <span>{title}</span>
            </Link>
          </div>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  const renderMenuGroup = (route: Partial<TMenu>) => {
    const title = route.meta?.title
    if (!title) return null
    const Icon = route.meta?.icon as any
    const children = route.children?.filter((child) => child.path !== '') || []
    const isParentActive = isActiveParent(children)

    return (
      <Accordion className='w-full' key={title}>
        <SidebarMenuItem>
          <AccordionItem>
            <AccordionButton>
              <SidebarMenuButton
                tooltip={title}
                className={cn(
                  'transition-all duration-200 rounded-md',
                  isParentActive && 'bg-primary shadow-md text-[#111827] font-bold dark:text-white'
                )}
                asChild
              >
                <div>
                  {Icon && <Icon className={cn('w-4 h-4 mr-2')} />}
                  <span>{title}</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </div>
              </SidebarMenuButton>
            </AccordionButton>
            <AccordionPanel>
              <SidebarMenuSub>
                {children.map((child) => (
                  <React.Fragment key={child.path || child.to}>{renderMenuItem(child)}</React.Fragment>
                ))}
              </SidebarMenuSub>
            </AccordionPanel>
          </AccordionItem>
        </SidebarMenuItem>
      </Accordion>
    )
  }

  const filteredRoutes = routes.filter((route) => route.path !== '/' && route.path !== '*')

  return (
    <SidebarMenu>
      {filteredRoutes.map((route) => {
        const title = route.meta?.title
        const Icon = route.meta?.icon as any

        if (!title) return null

        if (route.path === '' && route.children?.length) {
          return renderMenuGroup({ ...route, path: `__group__-${title}` })
        }

        if (route.children?.length) {
          return renderMenuGroup(route)
        }

        const isActive = isActiveLink(route.path)

        const to = (route.to || route.path || '') + location.search

        return (
          <SidebarMenuItem key={route.path}>
            <SidebarMenuButton
              asChild
              tooltip={title}
              className={cn(
                'transition-all duration-200 rounded-md',
                isActive && 'bg-primary text-[#111827] font-bold',
                'dark:text-white'
              )}
            >
              <Link to={to}>
                {Icon && <Icon className={cn('w-4 h-4 mr-2')} />}
                <span>{title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
