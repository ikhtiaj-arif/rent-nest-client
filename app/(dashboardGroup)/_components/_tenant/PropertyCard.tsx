'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Bed, Bath, Zap } from 'lucide-react';

interface PropertyDetails {
  title: string;
  city: string;
  category?: string;
  bedrooms?: number;
  bathrooms?: number;
  price: number;
  currency?: string;
  amenities?: string[];
  image?: string;
}

interface PropertyCardProps {
  property: PropertyDetails;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const currencySymbol = property.currency === 'BDT' ? '৳' : property.currency || '$';

  return (
    <Card className="h-full overflow-hidden">
      {property.image && (
        <div className="w-full h-40 bg-muted overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl line-clamp-2">{property.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{property.city}</span>
              </div>
            </div>
            {property.category && (
              <Badge variant="secondary" className="flex-shrink-0">
                {property.category}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-foreground">
          {currencySymbol} {property.price.toLocaleString()}
          <span className="text-base font-normal text-muted-foreground">/month</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {property.bedrooms !== undefined && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
              <Bed className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <span className="font-semibold text-foreground">{property.bedrooms}</span>
                <span className="text-muted-foreground"> Beds</span>
              </span>
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
              <Bath className="w-4 h-4 text-primary" />
              <span className="text-sm">
                <span className="font-semibold text-foreground">{property.bathrooms}</span>
                <span className="text-muted-foreground"> Baths</span>
              </span>
            </div>
          )}
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 4).map((amenity) => (
                <Badge key={amenity} variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {amenity}
                </Badge>
              ))}
              {property.amenities.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{property.amenities.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
