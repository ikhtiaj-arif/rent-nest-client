'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, ChevronRight, Home } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PaymentCardProps {
  id: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  provider: 'STRIPE' | 'PAYPAL' | 'OTHER';
  createdAt: string;
  rentalRequest: {
    property: {
      title: string;
      city: string;
    };
  };
}

export function PaymentCard({
  id,
  amount,
  currency,
  status,
  provider,
  createdAt,
  rentalRequest,
}: PaymentCardProps) {
  const statusConfig = {
    COMPLETED: { bg: 'bg-emerald-50 dark:bg-emerald-950', text: 'text-emerald-700 dark:text-emerald-300', label: '✓ Completed' },
    PENDING: { bg: 'bg-amber-50 dark:bg-amber-950', text: 'text-amber-700 dark:text-amber-300', label: '⏳ Pending' },
    FAILED: { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-700 dark:text-red-300', label: '✕ Failed' },
    REFUNDED: { bg: 'bg-slate-50 dark:bg-slate-950', text: 'text-slate-700 dark:text-slate-300', label: '↩ Refunded' },
  };

  const config = statusConfig[status];
  const currencySymbol = currency.toUpperCase() === 'BDT' ? '৳' : currency.toUpperCase();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{provider}</h3>
              <p className="text-sm text-muted-foreground">{formatDate(createdAt)}</p>
            </div>
          </div>
          <Badge className={`${config.bg} ${config.text} border-0 shrink-0`}>
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">
            {currencySymbol} {amount.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="w-4 h-4" />
            <span className="truncate">{rentalRequest.property.title}</span>
          </div>
          <p className="text-xs text-muted-foreground">{rentalRequest.property.city}</p>
        </div>

        <Link href={`/dashboard/payments/${id}`}>
          <Button
            variant="outline"
            className="w-full gap-2 group"
          >
            View Receipt
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
