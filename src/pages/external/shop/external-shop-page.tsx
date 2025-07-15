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

export default function ExternalShopPage() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const { data: shopData, isFetching } = useCustomQuery({
    queryKey: [API.SHOP.DETAIL],
    fetcher: ShopService.getDetail,
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
        shop_id: Number(id)
      }
    }
  })

  const UserInfo = <RenderUserInfo data={shopData?.data?.data} />
  return (
    <>
      <SubSidebar routes={routes[1]['children'][0]} userInfo={UserInfo} />
      <SidebarInset className='overflow-hidden '>
        <div className='container'>
          <Outlet />
        </div>
      </SidebarInset>
    </>
  )
}
