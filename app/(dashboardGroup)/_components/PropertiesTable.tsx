"use client";

import Image from "next/image";
import Link from "next/link";
import PropertyPagination from "@/app/(publicGroup)/_components/PropertyPagination";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
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
import { Building2 } from "lucide-react";
import DeletePropertyDialog from "./DeletePropertyDialog";
import PropertyForm from "./PropertyForm";

interface PropertiesTableProps {
  properties: Property[];
  meta: {
    page: number;
    totalPage: number;
    total: number;
    limit: number;
  };
  currentUserId?: string;
  showLandlord?: boolean;
}

export default function PropertiesTable({
  properties,
  meta,
  currentUserId,
  showLandlord = true,
}: PropertiesTableProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              {showLandlord && <TableHead className="hidden md:table-cell">Landlord</TableHead>}
              <TableHead>Price</TableHead>
              <TableHead className="hidden lg:table-cell">Requests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {properties.map((property) => {
              const canEdit = currentUserId === property.landlordId && !property.onRent;

              return (
                <TableRow key={property.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {property.images.length > 0 ? (
                        <Image
                          src={property.images[0].url}
                          alt={property.title}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover h-12 w-12 border border-border shrink-0"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted border border-border shrink-0">
                          <Building2 className="h-6 w-6 text-muted-foreground/40" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate max-w-[200px] sm:max-w-xs">
                          {property.title}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground font-medium">
                    {property.city}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="font-normal text-xs">
                      {property.category.name}
                    </Badge>
                  </TableCell>

                  {showLandlord && (
                    <TableCell className="hidden md:table-cell">
                      <div className="text-xs">
                        <p className="font-medium text-foreground">{property.landlord.name}</p>
                        <p className="text-muted-foreground truncate max-w-[140px]">
                          {property.landlord.email}
                        </p>
                      </div>
                    </TableCell>
                  )}

                  <TableCell className="font-semibold text-sm text-foreground">
                    ৳{property.price.toLocaleString()}
                  </TableCell>

                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground text-center">
                    {property?._count?.rentalRequests ?? 0}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={property.isAvailable ? "AVAILABLE" : "UNAVAILABLE"} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                        <Link href={`/properties/${property.id}`}>
                          View
                        </Link>
                      </Button>

                      {canEdit && (
                        <>
                          <PropertyForm mode="edit" property={property} />
                          <DeletePropertyDialog propertyId={property.id} />
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {!properties.length && (
              <TableRow>
                <TableCell colSpan={showLandlord ? 8 : 7} className="p-0">
                  <EmptyState
                    icon={Building2}
                    title="No properties found"
                    description="There are currently no property listings matching your filters."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PropertyPagination meta={meta} />
    </div>
  );
}