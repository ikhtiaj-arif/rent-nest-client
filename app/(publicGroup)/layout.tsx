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
            <Navbar user={user} />
            <div className="container mx-auto">
                {children}

            </div>
        </>
    )
}

export default PublicGroupLayout