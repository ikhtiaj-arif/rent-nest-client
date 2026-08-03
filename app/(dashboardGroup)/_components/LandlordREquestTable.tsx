/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import ApproveRequestButton from "./ApproveRequestButton";
import RejectRequestDialog from "./RejectRequestDialog";

interface Props {
  requests: any[];
}

export default function LandlordRequestTable({
  requests,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>

            <TableHead>Contact</TableHead>

            <TableHead className="w-[350px]">
              Request Reason
            </TableHead>

            <TableHead>Requested</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div>
                  <p className="font-medium">
                    {request.user.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {request.user.role}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {request.user.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {request.user.phone}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <p className="line-clamp-3 max-w-sm text-sm">
                  {request.requestReason}
                </p>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />

                  {new Date(
                    request.createdAt
                  ).toLocaleDateString()}
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    request.status === "PENDING"
                      ? "secondary"
                      : request.status === "APPROVED"
                        ? "default"
                        : "destructive"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>

              <TableCell>
                {request.status === "PENDING" ? (
                  <div className="flex justify-end gap-2">
                    <ApproveRequestButton requestId={request.id} />

                    <RejectRequestDialog
                      requestId={request.id}
                    />
                    
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Reviewed
                  </span>
                )}
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
