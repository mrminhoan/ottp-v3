import { useCustomForm } from "@/hooks/use-custom-form"
import { useShopQuery } from "../query/useShopQuery"
import { useEffect } from "react"
import { PersonalInfo } from "./component/personal-info"

export default function BasicInfo() {
    const { data: shopData, isFetching } = useShopQuery()

    // Get the shop info object first
    const shopInfo = shopData?.data?.data

    const { methods, reset } = useCustomForm<any>({
        // zodSchema: userSchema,
        defaultValues: {
            username: shopInfo?.username,
            shopName: shopInfo?.shop_name,
            // password: shopInfo?.password,
            note: shopInfo?.description,
            apiKey: shopInfo?.api_key,
            endpoint_url: shopInfo?.endpoint_url,
            commission_rate: shopInfo?.commission_rate,
            commission_rate_withdraw: shopInfo?.commission_rate_withdraw,
            is_active_login: shopInfo?.is_active_otp,
            email: shopInfo?.email,
            insuranceMoney: shopInfo?.insurance_money,
            representative: shopInfo?.representative
        }
    })

    useEffect(() => {
        if (shopInfo) {
            const dataDetail = shopInfo

            reset({
                username: dataDetail.username,
                shop_name: dataDetail.shop_name,
                password: dataDetail.password,
                note: dataDetail.description,
                api_key: dataDetail.api_key,
                endpoint_url: dataDetail.endpoint_url,
                commission_rate: dataDetail.commission_rate,
                commission_rate_withdraw: dataDetail.commission_rate_withdraw,
                is_active_login: dataDetail.is_active_otp,
                email: dataDetail.email,
                insuranceMoney: dataDetail.insurance_money,
                representative: dataDetail.representative
            })
        }
    }, [shopInfo, reset])

    return <>
        <PersonalInfo
            methods={methods}
        />
    </>
}