import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DashboardPropertyCardProps {
    id: string;
    title: string;
    city: string;
    price: number;
    images?: { url: string; isPrimary: boolean }[];
    bedrooms: number;
    bathrooms: number;
    available: boolean;
    onDelete?: () => void;
}

export default function DashboardPropertyCard({
    id,
    title,
    city,
    price,
    images = [],
    bedrooms,
    bathrooms,
    available,
    onDelete,
}: DashboardPropertyCardProps) {
    // MODIFIED: Always show image container with fallback
    const primaryImage = images?.find(img => img.isPrimary)?.url || images?.[0]?.url || '/placeholder-property.png';
      const imageSrc = images?.[0]?.url || '/placeholder-property.png';
    console.log("imageSrc", images);
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
            <div className="relative h-48 bg-muted overflow-hidden">
                <Image
                    src={primaryImage}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-property.png';
                    }}
                />
                <Badge className="absolute top-3 right-3 z-10" variant={available ? "default" : "secondary"}>
                    {available ? "Available" : "Unavailable"}
                </Badge>
            </div>
            <CardHeader className="pb-3">
                <div className="space-y-2">
                    <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{city}</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">৳{price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                        {bedrooms}BR • {bathrooms}BA
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href={`/landlord-dashboard/properties/${id}`} className="flex items-center justify-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View</span>
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href={`/landlord-dashboard/properties/${id}/edit`} className="flex items-center justify-center gap-2">
                            <Edit2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={onDelete} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
