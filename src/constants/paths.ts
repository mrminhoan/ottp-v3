export const PATHS = {
  ROOT: '/',
  DASHBOARD: '/',
  SELLER: {
    ROOT: '/seller',
    LIST: '/seller/list',
    DEPOSIT: '/seller/deposit',
    WITHDRAWAL: '/seller/withdrawal'
  },
  SHOP: {
    ROOT: '/shop',
    LIST: '/shop/list',
    DEPOSIT: '/shop/deposit',
    WITHDRAWAL: '/shop/withdrawal'
  },
  USERS: {
    ROOT: '/users',
    LIST: '/users/list',
    TRANSACTION: '/users/transaction',
    DEPOSIT: '/users/deposit'
  },
  LOGIN: '/login',
  EXTERNAL: {
    ROOT: '/external',
    SHOP: {
      ROOT: '/external/shop',
      BASIC_INFO: '/external/shop/basic-info',
      USERS: '/external/shop/users',
      LOG: {
        ROOT: '/external/shop/log',
        SHOP_TRANSACTION: '/external/shop/log/shop-transaction',
        USER_TRANSACTION: '/external/shop/log/user-transaction'
      }
    },
    SELLER: {
      ROOT: '/external/seller',
      BASIC_INFO: '/external/seller/basic-info',
      USERS: '/external/seller/users',
      LOG: {
        ROOT: '/external/seller/log',
        SHOP_TRANSACTION: '/external/seller/log/shop-transaction',
        USER_TRANSACTION: '/external/seller/log/user-transaction'
      }
    }
  },
  LOGS: {
    ROOT: '/logs',
    TRON_GRID: '/logs/tron-grid',
    SYSTEM: '/logs/system',
    AGENT_ACTIONS: '/logs/agent-actions',
    TRANSFER: '/logs/transfer'
  }
}
