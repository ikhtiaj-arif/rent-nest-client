
import { Navbar } from "@/components/shared/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import DashboardSidebar from "./_components/DashboardSidebar";
import { MobileSidebarTrigger } from "./_components/MobileSidebarTrigger";

// MODIFIED: Added mobile sidebar trigger to navbar
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
            <div className="flex items-center justify-between md:hidden px-4 py-2 border-b border-border/50 bg-background/70 backdrop-blur-xl">
                <MobileSidebarTrigger user={user} />
                <span className="font-semibold text-sm">Dashboard</span>
                <div className="w-10" />
            </div>
            <Navbar user={user} />
            <SidebarProvider>
                <div className="flex flex-1">
                    <DashboardSidebar user={user} />
                    <main className="flex-1 min-w-0 lg:px-4">{children}</main>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default DashboardLayout
