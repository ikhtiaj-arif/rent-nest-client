'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPin, DollarSign, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface RentalRequestCardProps {
  id: string;
  status: 'ACTIVE' | 'APPROVED' | 'PENDING' | 'REJECTED';
  moveInDate: string;
  property: {
    title: string;
    city: string;
    price: number;
    averageRating?: number;
    totalReviews?: number;
  };
}

export function RentalRequestCard({
  id,
  status,
  moveInDate,
  property,
}: RentalRequestCardProps) {
  const statusConfig = {
    ACTIVE: { bg: 'bg-emerald-50 dark:bg-emerald-950', text: 'text-emerald-700 dark:text-emerald-300', label: 'Active' },
    APPROVED: { bg: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-300', label: 'Approved' },
    PENDING: { bg: 'bg-amber-50 dark:bg-amber-950', text: 'text-amber-700 dark:text-amber-300', label: 'Pending' },
    REJECTED: { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-700 dark:text-red-300', label: 'Rejected' },
  };

  const config = statusConfig[status];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{property.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{property.city}</p>
          </div>
          <Badge className={`${config.bg} ${config.text} border-0 shrink-0`}>
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">৳ {property.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{formatDate(moveInDate)}</span>
          </div>
        </div>

        <Link href={`/dashboard/rental-requests/${id}`}>
          <Button
            variant="outline"
            className="w-full gap-2 group"
          >
            View Details
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
