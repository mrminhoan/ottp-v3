import { PATHS } from '@/constants'
import { LoadedAleCore } from '@/lib/loaded-ale-core'
import { Home, Store, Users } from 'lucide-react'
import { TMenu } from '@/models/types'
import { ErrorBoundary } from 'react-error-boundary'

const MainPageLoadCore = LoadedAleCore(() => import('@/pages/main/main-page'))
const DashboardLoadCore = LoadedAleCore(() => import('@/pages/dashboard/dashboard'))

// Main Seller
const SellerListLoadCore = LoadedAleCore(() => import('@/pages/seller/list/seller-list'))
const SellerDepositLoadCore = LoadedAleCore(() => import('@/pages/seller/deposit/seller-deposit'))
const SellerWithdrawalLoadCore = LoadedAleCore(() => import('@/pages/seller/withdrawal/seller-withdrawl'))

// Main Shop
const ShopListLoadCore = LoadedAleCore(() => import('@/pages/shop/list/shop-list'))
const ShopDepositLoadCore = LoadedAleCore(() => import('@/pages/shop/deposit/shop-deposit'))
const ShopWithdrawalLoadCore = LoadedAleCore(() => import('@/pages/shop/withdrawal/shop-withdrawal'))

// Main Users
// const UserListLoadCore = LoadedAleCore(() => import('@/pages/users/list/user-list'))
// const UserTransactionLoadCore = LoadedAleCore(() => import('@/pages/users/transaction/user-transaction'))

// Common
const LoginLoadCore = LoadedAleCore(() => import('@/pages/login/login'))
const NotFoundLoadCore = LoadedAleCore(() => import('@/pages/common/not-found'))
const ErrorPageLoadCore = LoadedAleCore(() => import('@/pages/common/error'))

const routes: Partial<TMenu>[] = [
  {
    path: PATHS.ROOT,
    element: (
      <ErrorBoundary fallback={<ErrorPageLoadCore />}>
        <MainPageLoadCore />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '',
        element: <DashboardLoadCore />,
        meta: { title: 'Dashboard', icon: <Home /> }
      },
      {
        path: PATHS.SHOP.ROOT,
        meta: { title: 'Shop', icon: <Store /> },
        children: [
          {
            path: '',
            to: PATHS.SHOP.LIST,
            element: <ShopListLoadCore />
          },
          {
            path: PATHS.SHOP.LIST,
            element: <ShopListLoadCore />,
            meta: { title: 'Shop List' }
          },
          {
            path: PATHS.SHOP.DEPOSIT,
            element: <ShopDepositLoadCore />,
            meta: { title: 'Shop Deposit' }
          },
          {
            path: PATHS.SHOP.WITHDRAWAL,
            element: <ShopWithdrawalLoadCore />,
            meta: { title: 'Shop Withdrawal' }
          }
        ]
      },
      {
        path: PATHS.SELLER.ROOT,
        to: PATHS.SELLER.LIST,
        meta: { title: 'Seller', icon: <Users /> },
        children: [
          {
            path: PATHS.SELLER.LIST,
            element: <SellerListLoadCore />,
            meta: { title: 'Seller List' }
          },
          {
            path: PATHS.SELLER.DEPOSIT,
            element: <SellerDepositLoadCore />,
            meta: { title: 'Seller Deposit' }
          },
          {
            path: PATHS.SELLER.WITHDRAWAL,
            element: <SellerWithdrawalLoadCore />,
            meta: { title: 'Seller Withdrawal' }
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundLoadCore />
      }
    ]
  },
  {
    path: PATHS.LOGIN,
    element: (
      <ErrorBoundary fallback={<ErrorPageLoadCore />}>
        <LoginLoadCore />
      </ErrorBoundary>
    )
  },
  {
    path: '*',
    element: <NotFoundLoadCore />
  }
]

export default routes
