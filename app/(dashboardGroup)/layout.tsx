
import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";


const DashboardLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    const user = await getMe();
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar user={user} />
            {/* <Navbar /> */}
            {/* <SidebarProvider> */}
            <div className="flex flex-1">
                {/* <DashboardSidebar user={user} /> */}
                <main className="flex-1 min-w-0">{children}</main>
            </div>
            {/* </SidebarProvider> */}
        </div>
    );
};

export default DashboardLayout