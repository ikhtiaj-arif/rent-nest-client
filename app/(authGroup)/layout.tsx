
import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";


const AuthGroupLayout = async (
    { children }: { children: React.ReactNode }) => {

    const user = await getMe();
    return <div className="flex min-h-screen flex-col">
        <Navbar user={user} />

        <div className="flex flex-1 items-center justify-center px-4 py-10">
            {children}
        </div>
    </div>
};

export default AuthGroupLayout;
