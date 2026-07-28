

const AuthGroupLayout = async (
    { children }: { children: React.ReactNode }) => {

    //  const user = await getMe();
    return <div className="flex  items-center justify-center px-6 py-10">
        {/* <Navbar user={user}/> */}
        {children}

    </div>;
};

export default AuthGroupLayout;
