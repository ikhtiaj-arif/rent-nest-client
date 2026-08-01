
"use client";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Building2, DollarSign, Eye, MapPin } from "lucide-react";

import { Property } from "@/lib/types";

import PropertyPagination from "@/app/(publicGroup)/_components/PropertyPagination";
import PropertyForm from "./PropertyForm";

// MODIFIED: Redesigned with better UI, images, and responsive grid layout
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
            <Card className="border-dashed">
                <CardContent className="flex h-64 flex-col items-center justify-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Building2 className="h-8 w-8 text-primary" />
                    </div>

                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-1">
                            No properties listed yet
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Create your first property to start accepting tenants.
                        </p>
                    </div>

                    <PropertyForm mode="create" />
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                    <DashboardPropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>

            {meta.totalPage > 1 && <PropertyPagination meta={meta} />}
        </>
    );
}

interface DashboardPropertyCardProps {
    property: Property;
}

function DashboardPropertyCard({
    property,
}: DashboardPropertyCardProps) {
    const imageSrc = property.images?.[0]?.url || '/placeholder-property.png';

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
            {/* Image */}
            <div className="relative h-40 w-full bg-muted overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-property.png';
                    }}
                />
                <Badge
                    className="absolute top-3 right-3 z-10"
                    variant={property.isAvailable ? "default" : "secondary"}
                >
                    {property.isAvailable ? "Available" : "Rented"}
                </Badge>
            </div>

            {/* Details */}
            <CardContent className="p-4 space-y-4">
                <div>
                    <h3 className="text-base font-semibold line-clamp-2">
                        {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">{property.city}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-lg font-bold text-primary">
                            {property.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">/month</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                        {property.category.name}
                    </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1"
                    >
                        <Link href={`/properties/${property.id}`} className="flex items-center justify-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View</span>
                        </Link>
                    </Button>

                    <PropertyForm
                        mode="edit"
                        property={property}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
