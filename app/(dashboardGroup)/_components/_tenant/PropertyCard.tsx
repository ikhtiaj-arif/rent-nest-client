"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, Bath, MapPin, Maximize2 } from "lucide-react";

interface PropertyCardProps {
  property: {
    title: string;
    city: string;
    price: number;
    bedrooms?: number | null;
    bathrooms?: number | null;
    area?: number | null;
    furnished?: boolean;
    isAvailable?: boolean;
    category?: {
      name: string;
    };
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{property.title}</CardTitle>

            <div className="flex items-center gap-1 mt-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              {property.city}
            </div>
          </div>

          {property.category && (
            <Badge>{property.category.name}</Badge>
          )}
        </div>

        <div className="text-3xl font-bold">
          ৳ {property.price.toLocaleString()}
          <span className="text-base text-muted-foreground font-normal">
            /month
          </span>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">

        <div className="flex items-center gap-2">
          <Bed className="w-4 h-4" />
          {property.bedrooms ?? "--"} Beds
        </div>

        <div className="flex items-center gap-2">
          <Bath className="w-4 h-4" />
          {property.bathrooms ?? "--"} Baths
        </div>

        <div className="flex items-center gap-2">
          <Maximize2 className="w-4 h-4" />
          {property.area ?? "--"} sqft
        </div>

        <Badge
          variant={property.isAvailable ? "default" : "secondary"}
          className="w-fit"
        >
          {property.isAvailable ? "Available" : "Unavailable"}
        </Badge>

        {property.furnished && (
          <Badge variant="outline">Furnished</Badge>
        )}
      </CardContent>
    </Card>
  );
}