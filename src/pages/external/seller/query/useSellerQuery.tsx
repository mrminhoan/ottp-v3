import { alertService } from '@/components/ui/custom/custom-toast/alert.service'
import { API } from '@/constants/api'
import { SellerService } from '@/service/pages/seller/seller.service'
import { useCustomQuery } from '@/tanstack-query'
import { useSearchParams } from 'react-router-dom'

export const useSellerQuery = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  return useCustomQuery({
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
}
