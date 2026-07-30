/* eslint-disable @typescript-eslint/no-explicit-any */

import { Badge } from "@/components/ui/badge";
import { getLandlordRentalRequests } from "../../_actions/landlordActions";

export default async function RentalRequestsPage({ query, }: {
    query?: Record<string, string | string[] | undefined>;
}) {
    const result = await getLandlordRentalRequests({ query });
    const requests = result?.data?.data || [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Rental Requests</h1>
                <p className="text-muted-foreground mt-2">Total requests: {requests.length}</p>
            </div>

            {requests?.length === 0 ? (
                <div className="p-8 bg-card border rounded-lg text-center">
                    <p className="text-muted-foreground">No rental requests yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests?.map((request: any) => (
                        <div key={request.id} className="p-4 bg-card border rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold">{request.property?.title}</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Tenant</p>
                                            <p className="font-medium">{request.tenant?.firstName} {request.tenant?.lastName}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Location</p>
                                            <p className="font-medium">{request.property?.city}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Move-in</p>
                                            <p className="font-medium">{new Date(request.moveInDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Rent</p>
                                            <p className="font-medium">৳{request.monthlyRent}</p>
                                        </div>
                                    </div>
                                </div>
                                <Badge>{request.status}</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
