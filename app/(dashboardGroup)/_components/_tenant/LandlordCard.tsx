'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Star, User } from 'lucide-react';

interface LandlordInfo {
  name: string;
  email?: string;
  phone?: string;
  averageRating?: number;
  totalReviews?: number;
  image?: string;
}

interface LandlordCardProps {
  landlord: LandlordInfo;
}

export function LandlordCard({ landlord }: LandlordCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-5 h-5" />
          Landlord Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{landlord.name}</h3>
            {landlord.averageRating !== undefined && (
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(landlord.averageRating || 0)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({landlord.totalReviews} reviews)
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {landlord.email && (
            <a
              href={`mailto:${landlord.email}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm text-foreground group-hover:underline break-all">{landlord.email}</span>
            </a>
          )}
          {landlord.phone && (
            <a
              href={`tel:${landlord.phone}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm text-foreground group-hover:underline">{landlord.phone}</span>
            </a>
          )}
        </div>

        <Button className="w-full gap-2">
          <Mail className="w-4 h-4" />
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
}
