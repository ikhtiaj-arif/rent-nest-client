"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";

interface LandlordCardProps {
  landlord: {
    name: string;
    email?: string;
    phone?: string;
  };
}

export function LandlordCard({
  landlord,
}: LandlordCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Landlord
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold">
              {landlord.name}
            </h3>
          </div>
        </div>

        {landlord.email && (
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            {landlord.email}
          </div>
        )}

        {landlord.phone && (
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            {landlord.phone}
          </div>
        )}
      </CardContent>
    </Card>
  );
}