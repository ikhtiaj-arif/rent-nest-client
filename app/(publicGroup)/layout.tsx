import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";

const PublicGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      </div>
      <Navbar user={user} />
      <main className="relative z-10 flex-1">{children}</main>
    </div>
  );
};

export default PublicGroupLayout;