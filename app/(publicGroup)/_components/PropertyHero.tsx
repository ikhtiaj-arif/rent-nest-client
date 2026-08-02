"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from "@/lib/types";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RentalRequestModal from "./RentalRequestModal";


interface PropertyHeroProps {
    property: Property;
    isAuthenticated: boolean
}

export default function PropertyHero({
    property,
    isAuthenticated
}: PropertyHeroProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const imageSrc = property?.images?.[0]?.url || '/placeholder-property.png';

    return (
        <>
            <section className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
                {/* Property Image */}
                <div className="relative h-72 overflow-hidden rounded-2xl border bg-muted sm:h-96 lg:h-[34rem]">
                    <Image
                        src={imageSrc}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width:768px)100vw,(max-width:1200px)65vw,70vw"
                    />
                </div>

                {/* Property Summary */}
                <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold leading-tight lg:text-3xl">
                                {property.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{property.city}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>
                                        {property.averageRating || 0}
                                        <span className="ml-1 text-muted-foreground">
                                            ({property.totalReviews} reviews)
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Badge
                            variant={property.isAvailable ? "default" : "secondary"}
                            className="shrink-0"
                        >
                            {property.isAvailable ? "Available" : "Unavailable"}
                        </Badge>
                    </div>

                    {/* Price Card */}
                    <div className="my-8 rounded-xl border bg-muted/40 p-5">
                        <p className="text-sm text-muted-foreground">
                            Monthly Rent
                        </p>

                        <div className="mt-2 flex items-end gap-2">
                            <span className="text-4xl font-bold">
                                ${property.price.toLocaleString()}
                            </span>

                            <span className="pb-1 text-muted-foreground">
                                /month
                            </span>
                        </div>

                        <Badge
                            variant="outline"
                            className="mt-4"
                        >
                            {property.category.name}
                        </Badge>
                    </div>

                    {/* Property Stats */}
                    <div className="grid grid-cols-2 gap-4 rounded-xl border p-4">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Bedrooms
                            </p>
                            <p className="mt-1 font-semibold">
                                {property.bedrooms ?? "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Bathrooms
                            </p>
                            <p className="mt-1 font-semibold">
                                {property.bathrooms ?? "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Area
                            </p>
                            <p className="mt-1 font-semibold">
                                {property.area ? `${property.area} sqft` : "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Furnished
                            </p>
                            <p className="mt-1 font-semibold">
                                {property.furnished ? "Yes" : "No"}
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <Button
                        className="mt-auto h-12 w-full"
                        disabled={!property.isAvailable}
                        onClick={() => {
                            if (!isAuthenticated) {
                                router.push(
                                    `/login?redirect=${encodeURIComponent(
                                        `/properties/${property.id}`
                                    )}`
                                );
                                return;
                            }

                            setIsModalOpen(true);
                        }}
                    >
                        {property.isAvailable
                            ? "Request Rental"
                            : "Currently Unavailable"}
                    </Button>
                </div>
            </section>

            <RentalRequestModal
                property={property}
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </>
    );
}
