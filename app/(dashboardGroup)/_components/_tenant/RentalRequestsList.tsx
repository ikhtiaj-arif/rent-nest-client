'use client';

import { RentalRequestCard } from "./RentalCard";



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

interface RentalRequestsListProps {
  requests: RentalRequest[];
  isLoading?: boolean;
}

export function RentalRequestsList({ requests, isLoading }: RentalRequestsListProps) {
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

  if (!requests || requests.length === 0) {
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
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">No rental requests</h3>
        <p className="text-muted-foreground">You haven&apos;t created any rental requests yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((request) => (
        <RentalRequestCard
          key={request.id}
          id={request.id}
          status={request.status}
          moveInDate={request.moveInDate}
          property={request.property}
        />
      ))}
    </div>
  );
}
