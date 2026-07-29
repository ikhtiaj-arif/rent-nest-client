'use client';

import { PaymentCard } from "./PaymentCard";

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

interface PaymentsListProps {
  payments: Payment[];
  isLoading?: boolean;
}

export function PaymentsList({ payments, isLoading }: PaymentsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-muted h-64 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">No payments</h3>
        <p className="text-muted-foreground">You haven&apos;t made any payments yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {payments.map((payment) => (
        <PaymentCard
          key={payment.id}
          id={payment.id}
          amount={payment.amount}
          currency={payment.currency}
          status={payment.status}
          provider={payment.provider}
          createdAt={payment.createdAt}
          rentalRequest={payment.rentalRequest}
        />
      ))}
    </div>
  );
}
