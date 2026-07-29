/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getTenantsOwnPayments, getTenantsOwnRentalRequests } from '../../_actions/tenantActions';
import { RequestsTabs } from '../../_components/_tenant/RequestTabs';

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
    console.log("rentalRequests", await rentalRequestsRes);
    // Calculate summary statistics
    const totalRequests = rentalRequestsRes?.data?.meta?.total || 0;
    const activeRequests = rentalRequests.filter((r: { status: string; }) => r.status === 'ACTIVE').length;
    const approvedRequests = rentalRequests.filter((r: { status: string; }) => r.status === 'APPROVED').length;
    const totalPaymentAmount = payments.reduce((sum: any, p: { amount: any; }) => sum + (p.amount || 0), 0);

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <div className="border-b border-border bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">My Rentals</h1>
                            <p className="text-muted-foreground mt-2">Manage your rental requests and payments</p>
                        </div>
                        <Link href="/tenant/rental-requests/new">
                            <Button className="gap-2 w-full sm:w-auto">
                                <Plus className="w-4 h-4" />
                                New Request
                            </Button>
                        </Link>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <StatCard
                            label="Total Requests"
                            value={totalRequests}
                            subtitle={`${activeRequests} active`}
                            icon="📋"
                        />
                        <StatCard
                            label="Active"
                            value={activeRequests}
                            subtitle="In progress"
                            icon="🔄"
                        />
                        <StatCard
                            label="Approved"
                            value={approvedRequests}
                            subtitle="Ready to move"
                            icon="✓"
                        />
                        <StatCard
                            label="Total Paid"
                            value={`৳ ${totalPaymentAmount.toLocaleString()}`}
                            subtitle={`${payments.length} payments`}
                            icon="💳"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
                    <RequestsTabs
                        rentalRequests={rentalRequests}
                        payments={payments}
                    />
                </Suspense>
            </div>
        </div>
    );
};

function StatCard({
    label,
    value,
    subtitle,
    icon,
}: {
    label: string;
    value: string | number;
    subtitle: string;
    icon: string;
}) {
    return (
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{icon}</span>
            </div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-foreground">{value}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
        </div>
    );
}

export default TenantRentalRequestsPage;
