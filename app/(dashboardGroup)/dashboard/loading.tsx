import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton";

export default function TenantDashboardLoading() {
    return <DashboardSkeleton statCount={4} rowCount={4} />;
}
