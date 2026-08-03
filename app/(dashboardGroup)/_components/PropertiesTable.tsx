"use client";

import Image from "next/image";
import Link from "next/link";

import PropertyPagination from "@/app/(publicGroup)/_components/PropertyPagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from "@/lib/types";
import { Home } from "lucide-react";
import DeletePropertyDialog from "./DeletePropertyDialog";
import PropertyForm from "./PropertyForm";
import EndRentalDialog from "./EndRentalDialog";


interface PropertiesTableProps {
  properties: Property[];
  meta: {
    page: number;
    totalPage: number;
    total: number;
    limit: number;
  };
  currentUserId?: string;
  showLandlord?: boolean; // Admin = true, Landlord = false
}

export default function PropertiesTable({
  properties,
  meta,
  currentUserId,
  showLandlord,
}: PropertiesTableProps) {
  console.log("properties", properties);

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Landlord</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Requests</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {properties.map((property) => {
              const canEdit = currentUserId === property.landlordId && !property.onRent;
              const isOwner = currentUserId === property.landlordId; 
              const canEndRental = isOwner && property.onRent;

              // console.log(currentUserId, property);
              return (<TableRow key={property.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {property.images.length > 0 ? (
                      <Image
                        src={property.images[0].url}
                        alt={property.title}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <Home className="h-15 w-15 rounded-md bg-muted" />
                    )}

                    <div>
                      <p className="font-medium">{property.title}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{property.city}</TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {property.category.name}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div>
                    <p>{property.landlord.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {property.landlord.email}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  ৳{property.price.toLocaleString()}
                </TableCell>

                <TableCell>
                  {property?._count?.rentalRequests}
                </TableCell>

                <TableCell>
                  {property?._count?.reviews}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      property.isAvailable
                        ? "default"
                        : "secondary"
                    }
                  >
                    {property.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/properties/${property.id}`}>
                        View
                      </Link>
                    </Button>

                    {canEdit && (<>
                      <PropertyForm
                        mode="edit"
                        property={property}
                      />

                      <DeletePropertyDialog
                        propertyId={property.id}
                      /> </>
                    )}
                     
                  </div>
                </TableCell>
              </TableRow>)
            })}

            {!properties.length && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-12 text-center text-muted-foreground"
                >
                  No properties found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PropertyPagination meta={meta} />
    </>
  );
}