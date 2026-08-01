import Link from "next/link";

import { ArrowRight } from "lucide-react";

import PropertiesCard from "@/app/(publicGroup)/_components/PropertiesCard";
import { Button } from "@/components/ui/button";
import { Property } from "@/lib/types";
;

interface FeaturedPropertiesProps {
    properties: Property[];
}

export default function FeaturedProperties({
    properties,
}: FeaturedPropertiesProps) {
    return (
        <section className="bg-muted/30 py-20">
            <div className="container mx-auto px-4">

                <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

                    <div>
                        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                            Featured Listings
                        </span>

                        <h2 className="mt-2 text-4xl font-bold tracking-tight">
                            Discover Your Next Home
                        </h2>

                        <p className="mt-4 max-w-2xl text-muted-foreground">
                            Explore hand-picked rental properties from trusted landlords.
                            Apartments, villas, studios and family homes across Bangladesh.
                        </p>
                    </div>

                    <Button asChild variant="outline">
                        <Link href="/properties">
                            View All Properties
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                </div>

                {properties?.length === 0 ? (
                    <div className="rounded-2xl border border-dashed py-20 text-center">

                        <h3 className="text-xl font-semibold">
                            No featured properties found
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                            New properties will appear here soon.
                        </p>

                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {properties?.slice(0, 8).map((property) => (
                            <PropertiesCard
                                key={property.id}
                                property={property}
                            />
                        ))}
                    </div>
                )}

                {properties?.length > 8 && (
                    <div className="mt-12 flex justify-center">
                        <Button asChild size="lg">
                            <Link href="/properties">
                                Browse All Properties
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}