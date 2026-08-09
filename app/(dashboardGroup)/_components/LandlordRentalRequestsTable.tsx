import {
    Calendar,
    Mail,
    Phone,
    FileText
} from "lucide-react";

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

import { LandlordRequest } from "@/lib/types";
import ApproveRequestButton from "./ApproveRequestButton";
import RejectRequestDialog from "./RejectRequestDialog";

interface Props {
    requests: LandlordRequest[];
}

export default function LandlordRentalRequestsTable({
    requests,
}: Props) {
    if (requests.length === 0) {
        return (
            <EmptyState 
                icon={FileText} 
                title='No requests found' 
                description='There are no landlord requests to review at this time.' 
            />
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-xs">
            <Table>
                <TableHeader className="bg-muted/40">
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
                    {requests.map((request) => {
                        return (
                            <TableRow 
                                key={request.id}
                                className="hover:bg-muted/30 transition-colors"
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                                            {request.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {request.user.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {request.user.role}
                                            </p>
                                        </div>
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
                                    <StatusBadge status={request.status} />
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
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}