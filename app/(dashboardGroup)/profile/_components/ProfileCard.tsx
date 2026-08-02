import Image from "next/image";
import { Mail, Phone, MapPin, Calendar, User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    phone: string | null;
    profilePicture: string | null;
    bio: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    address: string | null;
    role: string;
    status: string;
    createdAt: string;
  };
}

export default function ProfileCard({
  user,
}: ProfileCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
          {/* Avatar */}
          <div className="relative h-28 w-28 overflow-hidden rounded-full border bg-muted">
            <Image
              src={user.profilePicture || "/images/avatar-placeholder.png"}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-5">
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>

              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{user.role}</Badge>

                <Badge variant="secondary">
                  {user.status}
                </Badge>
              </div>
            </div>

            <div className="grid gap-3 text-sm md:grid-cols-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {user.phone || "Not provided"}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                {user.gender || "Not specified"}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "Not specified"}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground md:col-span-2">
                <MapPin className="h-4 w-4" />
                {user.address || "No address added"}
              </div>
            </div>

            <div>
              <h3 className="mb-1 font-medium">Bio</h3>

              <p className="text-sm text-muted-foreground">
                {user.bio || "No bio added yet."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}