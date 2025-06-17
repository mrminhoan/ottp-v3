import { UserStore } from '@/service/pages/users'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const GuardProtectRoute = ({ component: Component }: any) => {
  return UserStore.getProfile()?.shop_id && UserStore.getAccessToken() ? (
    React.isValidElement(Component) ? (
      Component
    ) : (
      <Component />
    )
  ) : (
    <Navigate to='/login' />
  )
}
