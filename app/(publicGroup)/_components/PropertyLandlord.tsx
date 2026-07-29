import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User } from "lucide-react";

interface PropertyLandlordProps {
    landlord: {
        id: string;
        name: string;
        email: string;
        phone: string;
    };
}

export default function PropertyLandlord({
    landlord,
}: PropertyLandlordProps) {
    const initials = landlord.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Landlord Information</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-lg font-semibold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <h3 className="text-lg font-semibold">
                                {landlord.name}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Property Owner
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-primary" />
                            <a
                                href={`mailto:${landlord.email}`}
                                className="hover:underline"
                            >
                                {landlord.email}
                            </a>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-primary" />
                            <a
                                href={`tel:${landlord.phone}`}
                                className="hover:underline"
                            >
                                {landlord.phone}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button className="flex-1">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Landlord
                    </Button>

                    <Button
                        variant="outline"
                        className="flex-1"
                    >
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}