"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      <div className="rounded-lg border p-12 text-center text-muted-foreground">
        No rental requests found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="px-6 py-4 font-medium">Tenant</th>
            <th className="px-6 py-4 font-medium">Property</th>
            <th className="px-6 py-4 font-medium">Move In</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => {

            // console.log(request);
            return (
              <tr
                key={request.id}
                className="border-t hover:bg-muted/40 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{request.tenant.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.tenant.email}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium">{request.property.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.property.city}
                  </p>
                </td>

                <td className="px-6 py-4">
                  {new Date(request.moveInDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <Badge
                    variant={
                      request.status === "ACTIVE"
                        ? "default"
                        : request.status === "PENDING"
                          ? "secondary"
                          : request.status === "REJECTED"
                            ? "destructive"
                            : request.status === "COMPLETED"
                              ? "outline"
                              : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                </td>

                <td className="px-6 py-4">
                  {request.status === "PENDING" ? (
                    <div className="flex justify-end gap-2">
                      <UpdateButton
                        id={request.id}
                        status="APPROVED"
                      />

                      <UpdateButton
                        id={request.id}
                        status="REJECTED"
                      />
                    </div>
                  ) : request.status === "ACTIVE" && request.property.onRent ? (
                    <div className="flex justify-end">
                      <EndRentalDialog rentalRequestId={request.id} />
                    </div>
                  ) : (
                    <div className="text-right text-sm text-muted-foreground">
                      —
                    </div>)}

                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
