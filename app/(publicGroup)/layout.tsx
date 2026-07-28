
const PublicGroupLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    // const user = await getMe();
    return (
        <div>
            {/* <Navbar user={user}/> */}
           
            {children}
        </div>
    )
}

export default PublicGroupLayout