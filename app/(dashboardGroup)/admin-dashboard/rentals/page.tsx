/* eslint-disable @typescript-eslint/no-explicit-any */

import PropertyPagination from "@/app/(publicGroup)/_components/PropertyPagination";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getAllRentals } from "../../_actions/adminActions";

interface Props {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const statusVariant = {
    PENDING: "secondary",
    APPROVED: "default",
    ACTIVE: "default",
    REJECTED: "destructive",
} as const;

export default async function AdminDashboardRentalsPage({
    searchParams,
}: Props) {
    const query = await searchParams;

    const res = await getAllRentals({
        query,
    });

    const rentals = res?.data?.data || [];
    const meta = res?.data?.meta;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <PageHeader title="Rental Management" description="Monitor all rental requests and their statuses." />

            <Card>
                <CardHeader>
                    <CardTitle>All Rentals</CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Property</TableHead>
                                <TableHead>Tenant</TableHead>
                                <TableHead>Landlord</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>Move In</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {rentals.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No rental requests found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rentals.map((r: any) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">
                                            {r.property.title}
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <p>{r.tenant.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {r.tenant.email}
                                                </p>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {r.property.landlord?.name}
                                        </TableCell>

                                        <TableCell>{r.property.city}</TableCell>

                                        <TableCell>
                                            {new Date(r.moveInDate).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant={
                                                    statusVariant[
                                                    r.status as keyof typeof statusVariant
                                                    ] ?? "outline"
                                                }
                                            >
                                                {r.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            ৳{r.property.price.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <PropertyPagination meta={meta} />
        </div>
    );
}