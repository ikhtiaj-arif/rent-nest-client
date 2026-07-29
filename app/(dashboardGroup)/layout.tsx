
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
                  {/* Background decoration */}
            <div className="absolute inset-0 rounded-3xl">
                <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
            </div>
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