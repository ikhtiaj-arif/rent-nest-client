"use server"

import { getLandlordRequests } from "../../_actions/adminActions";
import LandlordRequestTable from "../../_components/LandlordRequestTable";
 


const LandlordRequestsPage = async () => {
    const requestRes = await getLandlordRequests();

    const requests = requestRes?.data ?? [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Landlord Requests
                </h1>

                <p className="text-muted-foreground">
                    Review tenant requests to become landlords.
                </p>
            </div>

            {requests?.length === 0 ? (
                <div className="rounded-lg border p-12 text-center text-muted-foreground">
                    No pending requests.
                </div>
            ) : (

                <LandlordRequestTable
                    requests={requests} />

            )}
        </div>
    );
};

export default LandlordRequestsPage;