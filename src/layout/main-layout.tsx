import MainSidebar from '@/components/ui/layout/sidebar/main-sidebar/main-sidebar'
import { Outlet } from 'react-router-dom'
import routes from '@/routes/init-routes'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { MainHeader } from '@/components/ui/layout/header/main-header'
import { Separator } from '@/components/ui/separator'
import { useCustomQuery } from '@/tanstack-query/use-custom-query'
import { CommonService } from '@/service/pages/common/common.service'
import { API } from '@/constants'
import { alertService } from '@/components/ui/custom/custom-toast/alert.service'
import { UserStore } from '@/service/pages/users'
import { useShopStore } from '@/store/shop.store'
import { ShopModelResponse } from '@/models/class/shop/shop.model'

export const MainLayout = () => {
  const shopStore = useShopStore()
  useCustomQuery({
    queryKey: [API.COMMON.ME],
    fetcher: CommonService.getMe,
    props: {
      onSuccess: (data) => {
        console.log(data?.data)
        handleSetMe(data?.data?.data || {})
        return data
      },
      onError: (err) => {
        return alertService.error({
          title: 'Error',
          message: err.response.data.msg
        })
      },
      // payload: {
      //   shopId: UserStore.getProfile()?.shop_id
      // }
    }
  })

  const handleSetMe = (data: Partial<ShopModelResponse>) => {
    shopStore.set({
      username: data.username,
      shop_name: data.shop_name,
      wallet_address_base58: data.wallet_address_base58
    })
  }

  return (
    <SidebarProvider>
      <MainSidebar routes={routes[0]} />
      <SidebarInset className='overflow-hidden '>
        <MainHeader />
        <Separator />
        <div className='container'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
