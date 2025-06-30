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
const UserListLoadCore = LoadedAleCore(() => import('@/pages/users/list/user-list'))
// const UserTransactionLoadCore = LoadedAleCore(() => import('@/pages/users/transaction/user-transaction'))
const UserDepositLoadCore = LoadedAleCore(() => import('@/pages/users/deposit/deposit'))




// External
const ExternalPageLoadCore = LoadedAleCore(() => import('@/pages/external/external-page'))
// Shop
const ExternalShopPage = LoadedAleCore(() => import('@/pages/external/shop/external-shop-page'))
const ShopBasicInfoLoadCore = LoadedAleCore(() => import('@/pages/external/shop/basic-info/basic-info'))



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
        path: PATHS.USERS.ROOT,
        meta: { title: 'Users', icon: Users },
        children: [
          {
            path: '',
            to: PATHS.USERS.LIST,
            element: <GuardProtectRoute component={<UserListLoadCore />} />
          },
          {
            path: PATHS.USERS.LIST,
            element: <GuardProtectRoute component={<UserListLoadCore />} />,
            meta: { title: 'User List' }
          },
          {
            path: PATHS.USERS.DEPOSIT,
            element: <GuardProtectRoute component={<UserDepositLoadCore />} />,
            meta: { title: 'Deposit' }
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
    path: PATHS.EXTERNAL.ROOT,
    element: (
      <ErrorBoundary fallback={<ErrorPageLoadCore />}>
        <ExternalPageLoadCore />
      </ErrorBoundary>
    ),
    children: [
      {
        path: PATHS.EXTERNAL.SHOP.ROOT,
        // to: PATHS.EXTERNAL.SHOP.BASIC_INFO,
        element: <GuardProtectRoute component={<ExternalShopPage />} />,
        children: [
          {
            path: '',
            to: PATHS.EXTERNAL.SHOP.BASIC_INFO,
            element: <GuardProtectRoute component={<ShopBasicInfoLoadCore />} />
          },
          {
            path: PATHS.EXTERNAL.SHOP.BASIC_INFO,
            element: <GuardProtectRoute component={<ShopBasicInfoLoadCore />} />,
            meta: { title: 'Shop Basic Info' }
          }
        ]
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
