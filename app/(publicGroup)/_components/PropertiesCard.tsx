'use client'

import { Property } from '@/lib/types';
import { Building2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PropertiesCard = ({ property }: { property: Property }) => {
    const primaryImage =
        property.images?.find((img) => img.isPrimary) ?? property.images?.[0];

    return (
        <div className="overflow-hidden rounded-xl border shadow-sm transition hover:shadow-lg">
            <div className="relative aspect-[4/3] w-full bg-muted">
                {primaryImage ? (
                    <Image
                        src={primaryImage.url}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                        <Building2 className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                )}

                <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-sm font-medium ${property.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {property.isAvailable ? "Available" : "Rented"}
                </span>
            </div>

            <div className="p-5">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {property.category.name}
                </span>

                <h2 className="mt-3 text-xl font-bold">{property.title}</h2>

                <p className="mt-2 text-gray-500">{property.city}</p>

                <p className="mt-4 text-2xl font-bold text-primary">
                    BDT {property.price.toLocaleString()}/month
                </p>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {property.averageRating.toFixed(1)}
                    </span>
                    <span>{property.totalReviews} Reviews</span>
                </div>

                <div className="mt-4 text-sm">
                    <span className="font-medium">Landlord:</span>{" "}
                    {property.landlord.name}
                </div>

                <Link
                    href={`/properties/${property.id}`}
                    className="mt-5 inline-flex w-full justify-center rounded-lg bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default PropertiesCard;
