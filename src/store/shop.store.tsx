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
