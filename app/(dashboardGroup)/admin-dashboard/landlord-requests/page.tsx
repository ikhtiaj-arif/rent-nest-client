"use server"

import { getLandlordRequests } from "../../_actions/adminActions";
import LandlordRentalRequestsTable from "../../_components/LandlordRentalRequestsTable";
import { PageHeader } from "@/components/shared/PageHeader";




const LandlordRequestsPage = async () => {
    const requestRes = await getLandlordRequests();

    const requests = requestRes?.data ?? [];
 

    return (
        <div className="space-y-6 animate-fade-in-up">
            <PageHeader title="Landlord Requests" description="Review and manage landlord registration requests." />

            {requests?.length === 0 ? (
                <div className="rounded-lg border p-12 text-center text-muted-foreground">
                    No pending requests.
                </div>
            ) : (

                <LandlordRentalRequestsTable
                    requests={requests} />

            )}
        </div>
    );
};

export default LandlordRequestsPage;