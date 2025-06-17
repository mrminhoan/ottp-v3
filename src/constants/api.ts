export const API = {
  SITE: {
    LOGIN: '/login',
    REFRESS_TOKEN: '/refresh ',
    LOGOUT: '/logout',
    ME_INFO: '/shop/me'
  },
  COMMON: {
    MENU: '/menu',
    MENU_SHOP: '/menu/shop',
    MENU_SELLER: '/menu/seller',
    INFO_SUMMARY: '/info-summary',
    RECENT_TRANSACTION_LIST: '/recent-transaction-list',
    STATISTICS: {
      REQUEST: '/statistics/request',
      DAILY: '/statistics/daily'
    },
    ME: '/me'
  },
  MEDIA: {
    UPLOAD_IMAGE: '/upload-image'
  },

  MEMBER: {
    REGISTER: '/member/register',
    LIST: '/user/list-by-master'
  },
  SHOP: {
    REGISTER: '/create',
    CHECK_EXISTED: '/check-username-exist',
    LIST: '/shop/list',
    DETAIL: '/find-by-master'
  },
  SELLER: {
    LIST: '/seller/list',
    DETAIL: '/seller/details'
  },

  EXCHANGE: {
    EXCHANGE: '/transaction/list',
    ACCEPT: '/transaction/accept',
    CANCEL: '/transaction/reject'
  },

  LOGS: {
    TRANSFER_LOGS: '/transfer-logs/list'
  },

  IP_MANAGEMENT: {
    LIST: '/ip-management/list'
  }
}
