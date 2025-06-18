import { PATHS } from '@/constants'
import { LoadedAleCore } from '@/lib/loaded-ale-core'
import { Store, Users } from 'lucide-react'
import { TMenu } from '@/models/types'
import { ErrorBoundary } from 'react-error-boundary'
import { GuardProtectRoute } from './protected-route/guard-protect'
import { GuardPublicRoute } from './public-route/guard-public'

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
        element: <GuardProtectRoute component={<DashboardLoadCore />} />
        // meta: { title: 'Dashboard', icon: Home }
      },
      {
        path: PATHS.SHOP.ROOT,
        meta: { title: 'Shop', icon: Store },
        // to: PATHS.SHOP.LIST,
        children: [
          {
            path: '',
            to: PATHS.SHOP.LIST,
            element: <GuardProtectRoute component={<ShopListLoadCore />} />
          },
          {
            path: PATHS.SHOP.LIST,
            element: <GuardProtectRoute component={<ShopListLoadCore />} />,
            meta: { title: 'Shop List' }
          },
          {
            path: PATHS.SHOP.DEPOSIT,
            element: <GuardProtectRoute component={<ShopDepositLoadCore />} />,
            meta: { title: 'Shop Deposit' }
          },
          {
            path: PATHS.SHOP.WITHDRAWAL,
            element: <GuardProtectRoute component={<ShopWithdrawalLoadCore />} />,
            meta: { title: 'Shop Withdrawal' }
          }
        ]
      },
      {
        path: PATHS.SELLER.ROOT,
        // to: PATHS.SELLER.LIST,
        meta: { title: 'Seller', icon: Users },
        children: [
          {
            path: '',
            to: PATHS.SELLER.LIST,
            element: <GuardProtectRoute component={<SellerListLoadCore />} />
          },
          {
            path: PATHS.SELLER.LIST,
            element: <GuardProtectRoute component={<SellerListLoadCore />} />,
            meta: { title: 'Seller List' }
          },
          {
            path: PATHS.SELLER.DEPOSIT,
            element: <GuardProtectRoute component={<SellerDepositLoadCore />} />,
            meta: { title: 'Seller Deposit' }
          },
          {
            path: PATHS.SELLER.WITHDRAWAL,
            element: <GuardProtectRoute component={<SellerWithdrawalLoadCore />} />,
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
        <GuardPublicRoute component={<LoginLoadCore />} />
      </ErrorBoundary>
    )
  },
  {
    path: '*',
    element: <NotFoundLoadCore />
  }
]

export default routes
