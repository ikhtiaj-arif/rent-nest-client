"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";

import { AuthState } from "@/lib/types";
import { updateRentalRequestStatus } from "../_actions/landlordActions";
import EndRentalDialog from "./EndRentalDialog";

export interface RentalRequest {
  id: string;
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELLED";
  moveInDate: string;
  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  property: {
    id: string;
    title: string;
    city: string;
    price: number;
    onRent: boolean;
    isAvailable: boolean;
  };
}
export const initialAuthState: AuthState = {
  success: false,
  statusCode: 0,
  message: "",
};

function UpdateButton({
  id,
  status,
}: {
  id: string;
  status: "APPROVED" | "REJECTED";
}) {
  const action = updateRentalRequestStatus.bind(null, id, status);

  const [state, formAction, pending] = useActionState(
    action,
    initialAuthState
  );

  useEffect(() => {
    // Only show toast if state has been updated from action (not initial state)
    if (!state || (state.statusCode === 0 && state.message === "")) return;

    if (state.success) {
      toast.success(state.message || "Updated successfully");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button
        size="sm"
        type="submit"
        disabled={pending}
        variant={status === "APPROVED" ? "default" : "destructive"}
      >
        {pending ? "Updating..." : status}
      </Button>
    </form>
  );
}

export default function RentalRequestsTable({
  requests,
}: {
  requests: RentalRequest[];
}) {
  if (!requests.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No rental requests found"
        description="There are currently no rental requests to display."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-xs">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Move In</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.map((request) => {
            return (
              <TableRow
                key={request.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <p className="font-medium">{request.tenant.name}</p>
                </TableCell>
                
                <TableCell className="hidden md:table-cell">
                  <p className="text-sm text-muted-foreground">
                    {request.tenant.email}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="font-medium">{request.property.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.property.city}
                  </p>
                </TableCell>

                <TableCell>
                  {new Date(request.moveInDate).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <StatusBadge status={request.status} />
                </TableCell>

                <TableCell>
                  {request.status === "PENDING" ? (
                    <div className="flex justify-end gap-2">
                      <UpdateButton id={request.id} status="APPROVED" />
                      <UpdateButton id={request.id} status="REJECTED" />
                    </div>
                  ) : request.status === "ACTIVE" && request.property.onRent ? (
                    <div className="flex justify-end">
                      <EndRentalDialog rentalRequestId={request.id} />
                    </div>
                  ) : (
                    <div className="text-right text-sm text-muted-foreground">
                      —
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
