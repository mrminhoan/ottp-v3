import MainSidebar from "@/components/ui/layout/sidebar/main-sidebar/main-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import routes from "@/routes/init-routes";
import { Outlet } from "react-router-dom";

export default function ExternalPage() {
    return <SidebarProvider>
        <MainSidebar routes={routes[0]} />
        <SidebarInset className='overflow-hidden '>
            {/* <MainHeader /> */}
            <Separator />
            <div className='container'>
                <Outlet />
            </div>
        </SidebarInset>
    </SidebarProvider>
}