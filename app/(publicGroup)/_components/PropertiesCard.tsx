'use client'

import { Property } from '@/lib/types';
import Link from 'next/link';
import React from 'react';

const PropertiesCard = ({ property }: { property: Property }) => {
    return (
        <div className="rounded-xl border   p-5 shadow-sm transition hover:shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {property.category.name}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            property.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {property.isAvailable ? "Available" : "Rented"}
        </span>
      </div>

      <h2 className="text-xl font-bold">{property.title}</h2>

      <p className="mt-2 text-gray-500">{property.city}</p>

      <p className="mt-4 text-2xl font-bold text-primary">
        ${property.price.toLocaleString()}/month
      </p>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>⭐ {property.averageRating}</span>
        <span>{property.totalReviews} Reviews</span>
      </div>

      <div className="mt-4 text-sm">
        <span className="font-medium">Landlord:</span>{" "}
        {property.landlord.name}
      </div>

      <Link
        href={`/properties/${property.id}`}
        className="mt-5 inline-flex w-full justify-center rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
      >
        View Details
      </Link>
    </div>
    );
};

export default PropertiesCard;
