import { getProfileAction } from "./_actions/userAction";
import ChangePasswordCard from "./_components/ChangePasswordCard";
import ProfileCard from "./_components/ProfileCard";
import LandlordRequestCard from "./LandlordRequestCard";

 



export default async function ProfilePage() {
    const res = await getProfileAction();

    const user = res?.data;
    console.log("user:", user);

    if (!user) {
        return (
            <div className="container mx-auto py-10">
                <div className="rounded-lg border p-6">
                    Failed to load profile.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-5xl space-y-8 py-8">
            <div>
                <h1 className="text-3xl font-bold">My Profile</h1>

                <p className="mt-2 text-muted-foreground">
                    Manage your account information, security and landlord request.
                </p>
            </div>

            <ProfileCard user={user} />
            <ChangePasswordCard />



            {user.role === "TENANT" && (
                <LandlordRequestCard
                    landlordRequest={user.landlordRequest}
                />
            )}

        </div>
    );
}