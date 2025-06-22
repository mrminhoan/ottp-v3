import MainSidebar from "@/components/ui/layout/sidebar/main-sidebar/main-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import routes from "@/routes/init-routes";
import { Outlet } from "react-router-dom";

export default function ExternalShopPage() {
    return (
        <>
            <MainSidebar routes={routes[1]['children'][0]} />
            <SidebarInset className='overflow-hidden '>
                {/* <MainHeader /> */}
                <Separator />
                <div className='container'>
                    <Outlet />
                </div>
            </SidebarInset>
        </>
    )
}