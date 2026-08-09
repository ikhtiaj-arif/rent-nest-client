'use client';

import { Property } from '@/lib/types';
import { Building2, MapPin, Star, Bed, Bath, Maximize } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';

const PropertiesCard = ({ property }: { property: Property }) => {
    const primaryImage =
        property.images?.find((img) => img.isPrimary) ?? property.images?.[0];

    return (
        <div className="group overflow-hidden rounded-xl border border-border/60 bg-card text-card-foreground shadow-xs transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 flex flex-col h-full">
            <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
                {primaryImage ? (
                    <Image
                        src={primaryImage.url}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted/60">
                        <Building2 className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                )}

                <div className="absolute top-3 left-3 z-10">
                    <span className="rounded-full bg-background/90 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-foreground shadow-xs border border-border/50">
                        {property.category.name}
                    </span>
                </div>

                <div className="absolute top-3 right-3 z-10">
                    <StatusBadge status={property.isAvailable ? "AVAILABLE" : "UNAVAILABLE"} />
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="truncate">{property.city}</span>
                    </div>

                    <h3 className="text-lg font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {property.title}
                    </h3>
                </div>

                {/* Features strip */}
                {(property.bedrooms !== undefined || property.bathrooms !== undefined || property.area !== undefined) && (
                    <div className="flex items-center gap-3 py-2 border-y border-border/40 text-xs text-muted-foreground">
                        {property.bedrooms !== undefined && (
                            <span className="flex items-center gap-1">
                                <Bed className="h-3.5 w-3.5 text-muted-foreground/70" />
                                {property.bedrooms} Bed
                            </span>
                        )}
                        {property.bathrooms !== undefined && (
                            <span className="flex items-center gap-1">
                                <Bath className="h-3.5 w-3.5 text-muted-foreground/70" />
                                {property.bathrooms} Bath
                            </span>
                        )}
                        {property.area !== undefined && (
                            <span className="flex items-center gap-1">
                                <Maximize className="h-3.5 w-3.5 text-muted-foreground/70" />
                                {property.area} sqft
                            </span>
                        )}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Rent</p>
                            <p className="text-xl font-bold text-primary">
                                ৳{property.price.toLocaleString()}
                                <span className="text-xs font-normal text-muted-foreground">/mo</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs bg-muted/50 px-2.5 py-1 rounded-full border border-border/40">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-foreground">{property.averageRating.toFixed(1)}</span>
                            <span className="text-muted-foreground">({property.totalReviews})</span>
                        </div>
                    </div>

                    <Button asChild className="w-full font-semibold group-hover:bg-primary" size="sm">
                        <Link href={`/properties/${property.id}`}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertiesCard;
