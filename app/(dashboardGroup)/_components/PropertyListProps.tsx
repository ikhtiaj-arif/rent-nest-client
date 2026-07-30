import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Building2 } from "lucide-react";

import { Property } from "@/lib/types";

import PropertyPagination from "@/app/(publicGroup)/_components/PropertyPagination";
import PropertyForm from "./PropertyForm";
// import DeletePropertyDialog from "./DeletePropertyDialog";

interface DashboardPropertyListProps {
    properties: Property[];
    meta: {
        page: number;
        totalPage: number;
        total: number;
        limit: number;
    };
}

export default function DashboardPropertyList({
    properties,
    meta,
}: DashboardPropertyListProps) {
    if (!properties.length) {
        return (
            <Card>
                <CardContent className="flex h-64 flex-col items-center justify-center gap-4">
                    <Building2 className="h-12 w-12 text-muted-foreground" />

                    <div className="text-center">
                        <h3 className="font-semibold">
                            No properties yet
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Create your first property listing.
                        </p>
                    </div>

                    <PropertyForm mode="create" />
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {properties.map((property) => (
                    <DashboardPropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>

            <PropertyPagination meta={meta} />
        </>
    );
}

interface DashboardPropertyCardProps {
    property: Property;
}

function DashboardPropertyCard({
    property,
}: DashboardPropertyCardProps) {
    return (
        <Card>
            <CardContent className="flex gap-6 p-6">
                {/* Thumbnail */}
                <div className="flex h-36 w-48 items-center justify-center overflow-hidden rounded-lg bg-muted">
                    {/* {property.images?.length ? (
                        <img
                            src={property.images[0].url}
                            alt={property.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <Building2 className="h-10 w-10 text-muted-foreground" />
                    )} */}
                </div>

                {/* Details */}
                <div className="flex flex-1 justify-between">
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg font-semibold">
                                {property.title}
                            </h3>

                            <p className="text-muted-foreground">
                                {property.city}
                            </p>
                        </div>

                        <Badge variant="outline">
                            {property.category.name}
                        </Badge>

                        <p className="text-2xl font-bold">
                            ৳{property.price.toLocaleString()}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end justify-between">
                        <Badge
                            variant={
                                property.isAvailable
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            {property.isAvailable
                                ? "Available"
                                : "Unavailable"}
                        </Badge>

                        <div className="flex gap-2">
                            <Button
                                asChild
                                variant="outline"
                            >
                                <Link href={`/properties/${property.id}`}>
                                    View
                                </Link>
                            </Button>

                            <PropertyForm
                                mode="edit"
                                property={property}
                            />

                            {/* <DeletePropertyDialog propertyId={property.id} /> */}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}