// import {
//     CalendarDays,
//     Mail,
//     Phone,
//     ShieldCheck
// } from "lucide-react";

import { getProfileAction } from "./_actions/userAction";
import ChangePasswordCard from "./_components/ChangePasswordCard";
import ProfileCard from "./_components/ProfileCard";
import LandlordRequestCard from "./LandlordRequestCard";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// const user = {
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "+880 1712345678",
//     role: "Tenant",
//     joined: "January 2025",
// };

// export default function ProfilePage() {
//     return (
//         <div className="mx-auto max-w-5xl space-y-6">
//             {/* Heading */}

//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-bold">
//                         My Profile
//                     </h1>

//                     <p className="text-muted-foreground">
//                         View and manage your personal information.
//                     </p>
//                 </div>

//                 <Button>
//                     Edit Profile
//                 </Button>
//             </div>

//             {/* Profile */}

//             <Card>
//                 <CardContent className="flex flex-col gap-8 p-8 md:flex-row">
//                     <Avatar className="h-28 w-28">
//                         <AvatarImage src="" />
//                         <AvatarFallback className="text-3xl">
//                             JD
//                         </AvatarFallback>
//                     </Avatar>

//                     <div className="flex-1">
//                         <h2 className="text-2xl font-semibold">
//                             {user.name}
//                         </h2>

//                         <p className="text-muted-foreground">
//                             {user.role}
//                         </p>

//                         <div className="mt-6 grid gap-5 md:grid-cols-2">
//                             <InfoItem
//                                 icon={<Mail className="h-4 w-4" />}
//                                 label="Email"
//                                 value={user.email}
//                             />

//                             <InfoItem
//                                 icon={<Phone className="h-4 w-4" />}
//                                 label="Phone"
//                                 value={user.phone}
//                             />

//                             <InfoItem
//                                 icon={<ShieldCheck className="h-4 w-4" />}
//                                 label="Role"
//                                 value={user.role}
//                             />

//                             <InfoItem
//                                 icon={<CalendarDays className="h-4 w-4" />}
//                                 label="Joined"
//                                 value={user.joined}
//                             />
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Account */}

//             <Card>
//                 <CardHeader>
//                     <CardTitle>
//                         Account Information
//                     </CardTitle>
//                 </CardHeader>

//                 <CardContent className="space-y-5">
//                     <Row
//                         label="Full Name"
//                         value={user.name}
//                     />

//                     <Separator />

//                     <Row
//                         label="Email Address"
//                         value={user.email}
//                     />

//                     <Separator />

//                     <Row
//                         label="Phone Number"
//                         value={user.phone}
//                     />

//                     <Separator />

//                     <Row
//                         label="Account Type"
//                         value={user.role}
//                     />
//                 </CardContent>
//             </Card>

//             {/* Security */}

//             <Card>
//                 <CardHeader>
//                     <CardTitle>
//                         Security
//                     </CardTitle>
//                 </CardHeader>

//                 <CardContent className="flex flex-wrap gap-3">
//                     <Button variant="outline">
//                         Change Password
//                     </Button>

//                     <Button variant="outline">
//                         Update Phone
//                     </Button>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// function InfoItem({
//     icon,
//     label,
//     value,
// }: {
//     icon: React.ReactNode;
//     label: string;
//     value: string;
// }) {
//     return (
//         <div className="flex items-center gap-3 rounded-lg border p-4">
//             <div className="rounded-md bg-primary/10 p-2 text-primary">
//                 {icon}
//             </div>

//             <div>
//                 <p className="text-sm text-muted-foreground">
//                     {label}
//                 </p>

//                 <p className="font-medium">
//                     {value}
//                 </p>
//             </div>
//         </div>
//     );
// }

// function Row({
//     label,
//     value,
// }: {
//     label: string;
//     value: string;
// }) {
//     return (
//         <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">
//                 {label}
//             </span>

//             <span className="font-medium">
//                 {value}
//             </span>
//         </div>
//     );
// }



// app/(dashboardGroup)/dashboard/profile/page.tsx



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