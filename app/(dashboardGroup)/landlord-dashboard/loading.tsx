import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton";

export default function LandlordDashboardLoading() {
    return <DashboardSkeleton statCount={3} rowCount={5} />;
}
