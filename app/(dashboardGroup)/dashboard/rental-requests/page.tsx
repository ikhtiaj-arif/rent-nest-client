/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Plus, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { getTenantsOwnPayments, getTenantsOwnRentalRequests } from '../../_actions/tenantActions';
import { RequestsTabs } from '../../_components/_tenant/RequestTabs';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';

const TenantRentalRequestsPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
    const query = await searchParams;

    // Fetch rental requests and payments in parallel
    const [rentalRequestsRes, paymentsRes] = await Promise.all([
        getTenantsOwnRentalRequests({ query }),
        getTenantsOwnPayments({ query }),
    ]);

    const rentalRequests = rentalRequestsRes?.data?.data || [];
    const payments = paymentsRes?.data || [];

    // Calculate summary statistics
    const totalRequests = rentalRequestsRes?.data?.meta?.total || 0;
    const activeRequests = rentalRequests.filter((r: { status: string; }) => r.status === 'ACTIVE').length;
    const approvedRequests = rentalRequests.filter((r: { status: string; }) => r.status === 'APPROVED').length;
    const totalPaymentAmount = payments.reduce((sum: any, p: { amount: any; }) => sum + (p.amount || 0), 0);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <PageHeader title="My Rentals" description="Manage your rental requests and track payments">
                <Link href={`/properties?isAvailable=true`}>
                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                        <Plus className="w-5 h-5" />
                        New Rental Request
                    </Button>
                </Link>
            </PageHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Requests"
                    value={totalRequests}
                    icon={Home}
                    variant="blue"
                    description={`${approvedRequests} ready to pay`}
                />
                <StatCard
                    title="Active Leases"
                    value={activeRequests}
                    icon={TrendingUp}
                    variant="emerald"
                    description="Currently living"
                />
                <StatCard
                    title="Approved"
                    value={approvedRequests}
                    icon={CheckCircle}
                    variant="amber"
                    description="Awaiting payment"
                />
                <StatCard
                    title="Total Paid"
                    value={`৳ ${(totalPaymentAmount / 1000).toFixed(1)}K`}
                    icon={Zap}
                    variant="purple"
                    description={`${payments.length} successful payments`}
                />
            </div>

            <Suspense fallback={<div className="text-center py-12">Loading your rentals...</div>}>
                <RequestsTabs
                    rentalRequests={rentalRequests}
                    payments={payments}
                />
            </Suspense>
        </div>
    );
};



export default TenantRentalRequestsPage;
