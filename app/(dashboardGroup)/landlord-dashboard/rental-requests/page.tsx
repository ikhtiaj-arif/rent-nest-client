import { getLandlordRentalRequests } from "../../_actions/landlordActions";
import RentalRequestsTable from "../../_components/RentalRequestsTable";

 

export default async function RentalRequestsPage() {
  const res = await getLandlordRentalRequests({});

  const requests = res.data?.data ?? [];
  const total = res.data?.meta?.total ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rental Requests</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage tenant rental requests.
        </p>
      </div>

      <div className="rounded-lg border bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Total Requests: <span className="font-semibold text-foreground">{total}</span>
        </p>
      </div>

      <RentalRequestsTable requests={requests} />
    </div>
  );
}