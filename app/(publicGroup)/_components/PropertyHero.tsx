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
            <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                {/* Image Placeholder */}
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-property.png';
                        }}
                    />
                </div>

                {/* Summary */}
                <div className="flex flex-col rounded-2xl border bg-card p-6">
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {property.title}
                                </h1>

                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {property.city}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                                        {property.averageRating || 0} (
                                        {property.totalReviews} reviews)
                                    </span>
                                </div>
                            </div>

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
                        </div>

                        <div className="rounded-xl bg-muted p-4">
                            <p className="text-sm text-muted-foreground">
                                Monthly Rent
                            </p>

                            <p className="mt-1 text-4xl font-bold">
                                ${property.price.toLocaleString()}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {property.category.name}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            console.log("button clicked");
                            if (!isAuthenticated) {
                                router.push(
                                    `/login?redirect=${encodeURIComponent(`/properties/${property.id}`)}`
                                );
                                return;
                            }

                            setIsModalOpen(true);
                        }}
                        className="mt-6 h-11 w-full"
                        disabled={!property.isAvailable}

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
