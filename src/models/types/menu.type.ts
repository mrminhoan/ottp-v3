import { ReactNode } from 'react'

export type RouteMeta = {
  title: string
  icon?: ReactNode
  hidden?: boolean
}

export type AppRoute = {
  path: string
  element?: ReactNode
  children?: Partial<AppRoute>[]
  meta?: Partial<RouteMeta>
  to?: string
}

export type TMenu = {
  path: string
  element?: React.ReactNode
  children?: TMenu[]
  to?: string
  meta?: {
    title: string
    icon?: React.ReactNode
    hidden?: boolean
  }
}
