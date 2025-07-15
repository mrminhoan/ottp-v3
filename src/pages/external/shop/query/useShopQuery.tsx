import { alertService } from "@/components/ui/custom/custom-toast/alert.service"
import { API } from "@/constants/api"
import { ShopService } from "@/service/pages/shop/shop.service"
import { useCustomQuery } from "@/tanstack-query"
import { useParams, useSearchParams } from "react-router-dom"

export const useShopQuery = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id');
    
    return useCustomQuery({
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
}   