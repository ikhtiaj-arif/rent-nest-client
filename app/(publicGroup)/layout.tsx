import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";



const PublicGroupLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    const user = await getMe();
    return (
        <>
            {/* Background decoration */}
            {/* <div className="absolute inset-0 rounded-3xl">
                <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
            </div> */}
            <Navbar user={user} />
            <div className="container mx-auto">
                {children}

            </div>
        </>
    )
}

export default PublicGroupLayout