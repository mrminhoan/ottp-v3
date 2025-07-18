import { alertService } from '@/components/ui/custom/custom-toast/alert.service'
import SubSidebar from '@/components/ui/layout/sidebar/sub-sidebar/sub-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset } from '@/components/ui/sidebar'
import { API } from '@/constants'
import routes from '@/routes/init-routes'
import { ShopService } from '@/service/pages/shop/shop.service'
import { useCustomQuery } from '@/tanstack-query/use-custom-query'
import { Outlet, useSearchParams } from 'react-router-dom'
import { RenderUserInfo } from './render-user-info'
import { ExternalShopHeader } from '@/components/ui/layout/header/external-shop-header'
import { SellerService } from '@/service/pages/seller/seller.service'
import { ExternalSellerHeader } from '@/components/ui/layout/header/external-seller-header'

export default function ExternalShopPage() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const { data: seller, isFetching } = useCustomQuery({
    queryKey: [API.SELLER.DETAIL],
    fetcher: SellerService.getDetail,
    props: {
      onSuccess: (data) => {
        return data
      },
      onError: (error) => {
        return alertService.error({
          title: 'Error',
          message: error.response.data.msg
        })
      },
      payload: {
        seller_id: Number(id)
      }
    }
  })

  const UserInfo = <RenderUserInfo data={seller?.data?.data} />
  return (
    <>
      <SubSidebar routes={routes[1]['children'][1]} userInfo={UserInfo} />
      <SidebarInset className='overflow-hidden '>
        <ExternalSellerHeader />
        <Separator />
        <div className='container'>
          <Outlet />
        </div>
      </SidebarInset>
    </>
  )
}
