import { ComponentType, ReactNode } from 'react'

export type RouteMeta = {
  title: string
  icon?: ComponentType<any>
  hidden?: boolean
}

export type AppRoute = {
  path: string
  element?: ReactNode
  children?: Partial<AppRoute>[]
  RouteMeta
  to?: string
}

export type TMenu = {
  path: string
  element?: React.ReactNode
  children?: TMenu[]
  to?: string
  meta?: RouteMeta
}
