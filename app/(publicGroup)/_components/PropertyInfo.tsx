import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Property } from "@/lib/types";
import {
    Building2,
    Calendar,
    CheckCircle2,
    MapPin,
    Star,
} from "lucide-react";

interface PropertyInfoProps {
    property: Property;
}

export default function PropertyInfo({
    property,
}: PropertyInfoProps) {
    const info = [
        {
            label: "Category",
            value: property.category.name,
            icon: Building2,
        },
        {
            label: "City",
            value: property.city,
            icon: MapPin,
        },
        {
            label: "Average Rating",
            value: `${property.averageRating || 0} / 5`,
            icon: Star,
        },
        {
            label: "Reviews",
            value: property.totalReviews,
            icon: Star,
        },
        {
            label: "Listed On",
            value: new Date(property.createdAt).toLocaleDateString(),
            icon: Calendar,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Property Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    {info.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className="flex items-start gap-4"
                            >
                                <div className="rounded-lg border bg-muted p-2">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        {item.label}
                                    </p>

                                    <p className="font-medium">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Separator />

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Availability
                        </p>

                        <Badge
                            className="mt-2"
                            variant={
                                property.isAvailable
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            {property.isAvailable ? (
                                <>
                                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                                    Available
                                </>
                            ) : (
                                "Unavailable"
                            )}
                        </Badge>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                            Monthly Rent
                        </p>

                        <p className="text-3xl font-bold">
                            ${property.price.toLocaleString()}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}