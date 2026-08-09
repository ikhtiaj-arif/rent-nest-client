import { getLandlordRentalRequests } from "../../_actions/landlordActions";
import RentalRequestsTable from "../../_components/RentalRequestsTable";
import { PageHeader } from "@/components/shared/PageHeader";

 

export default async function RentalRequestsPage() {
  const res = await getLandlordRentalRequests({});

  const requests = res.data?.data ?? [];
  const total = res.data?.meta?.total ?? 0;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="Rental Requests" description="Review incoming rental requests from tenants." />

      <div className="rounded-lg border bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Total Requests: <span className="font-semibold text-foreground">{total}</span>
        </p>
      </div>

      <RentalRequestsTable requests={requests} />
    </div>
  );
}