'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Property } from '@/lib/types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// MODIFIED: Added Next.js Image optimization and improved layout
const PropertiesCard = ({ property }: { property: Property }) => {

  const imageSrc = property.images?.[0]?.url || '/placeholder-property.png';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
      {/* Image Container */}
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

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="shrink-0">
            {property.category.name}
          </Badge>
          <Badge
            variant={property.isAvailable ? "default" : "secondary"}
            className="shrink-0"
          >
            {property.isAvailable ? "Available" : "Rented"}
          </Badge>
        </div>
        <h2 className="text-lg font-bold line-clamp-2">{property.title}</h2>
        <p className="text-sm text-muted-foreground">{property.city}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-bold text-primary">
            ৳{property.price.toLocaleString()}
          </p>
          <span className="text-xs text-muted-foreground">/month</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium">{property.averageRating}</span>
            <span className="text-muted-foreground">({property.totalReviews})</span>
          </div>
        </div>

        <div className="text-sm pt-2 border-t border-border">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Landlord:</span> {property.landlord.name}
          </p>
        </div>

        <Button asChild className="w-full">
          <Link href={`/properties/${property.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertiesCard;
