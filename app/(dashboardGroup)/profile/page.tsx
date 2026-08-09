import { PageHeader } from "@/components/shared/PageHeader";
import { getProfileAction } from "./_actions/userAction";
import ChangePasswordCard from "./_components/ChangePasswordCard";
import ProfileCard from "./_components/ProfileCard";
import LandlordRequestCard from "./LandlordRequestCard";

export default async function ProfilePage() {
    const res = await getProfileAction();

    const user = res?.data;

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
        <div className="container mx-auto max-w-5xl space-y-8 py-8 animate-fade-in-up">
            <PageHeader title="My Profile" description="Manage your account information, security and landlord request." />

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