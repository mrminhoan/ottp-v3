import { STATUS_ENDPOINT } from '@/constants'
import { ShopModelResponse } from '@/models/class/shop/shop.model'
import { proxy, useSnapshot } from 'valtio'

type TShopStore = Partial<ShopModelResponse> & {
  set(data: Partial<ShopModelResponse>): void
  reset(): void
}

export const shopStore = proxy<TShopStore>({
  username: '',
  shop_name: '',
  wallet_address_base58: '',
  id: 0,

  set(data: Partial<ShopModelResponse>) {
    Object.assign(shopStore, data)
  },

  reset() {
    shopStore.username = ''
    shopStore.shop_name = ''
    shopStore.wallet_address_base58 = ''
  }
})

export const shopStoreExternal = proxy<TShopStore>({
  username: '',
  shop_name: '',
  wallet_address_base58: '',
  endpoint_status: STATUS_ENDPOINT.ACTIVE,
  id: 0,

  set(data: Partial<ShopModelResponse>) {
    Object.assign(shopStore, data)
  },

  reset() {
    shopStore.username = ''
    shopStore.shop_name = ''
    shopStore.wallet_address_base58 = ''
  }
})

export const useShopStore = () => {
  return useSnapshot(shopStore)
}

export const useShopStoreExternal = () => {
  return useSnapshot(shopStoreExternal)
}