'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, CreditCard } from 'lucide-react';
import { PaymentsList } from './PaymentList';
import { RentalRequestsList } from './RentalRequestsList';

interface RentalRequest {
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

interface Payment {
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

interface RequestsTabsProps {
  rentalRequests: RentalRequest[];
  payments: Payment[];
}

export function RequestsTabs({ rentalRequests, payments }: RequestsTabsProps) {
  const [activeTab, setActiveTab] = useState('requests');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-muted p-1 rounded-lg">
        <TabsTrigger
          value="requests"
          className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Rental Requests</span>
          <span className="sm:hidden">Requests</span>
          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {rentalRequests.length}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="payments"
          className="gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
        >
          <CreditCard className="w-4 h-4" />
          <span className="hidden sm:inline">Payments</span>
          <span className="sm:hidden">Payments</span>
          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            {payments.length}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="requests" className="mt-8">
        <RentalRequestsList requests={rentalRequests} />
      </TabsContent>

      <TabsContent value="payments" className="mt-8">
        <PaymentsList payments={payments} />
      </TabsContent>
    </Tabs>
  );
}
