import { UserStore } from '@/service/pages/users'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const GuardPublicRoute = ({ component: Component, ...rest }: any) => {
  return !(UserStore.getProfile()?.shop_id && UserStore.getAccessToken()) ? (
    React.isValidElement(Component) ? (
      Component
    ) : (
      <Component {...rest} />
    )
  ) : (
    <Navigate to='/' />
  )
}
