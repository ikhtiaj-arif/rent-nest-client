/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Plus, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
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

    // Calculate summary statistics
    const totalRequests = rentalRequestsRes?.data?.meta?.total || 0;
    const activeRequests = rentalRequests.filter((r: { status: string; }) => r.status === 'ACTIVE').length;
    const approvedRequests = rentalRequests.filter((r: { status: string; }) => r.status === 'APPROVED').length;
    const totalPaymentAmount = payments.reduce((sum: any, p: { amount: any; }) => sum + (p.amount || 0), 0);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header Section */}
            <div className="relative border-b border-border bg-gradient-to-b from-primary/5 to-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">My Rentals</h1>
                            <p className="text-lg text-muted-foreground">Manage your rental requests and track payments</p>
                        </div>
                        <Link href={`/properties?isAvailable=true`}>
                            <Button size="lg" className="gap-2 w-full sm:w-auto">
                                <Plus className="w-5 h-5" />
                                New Rental Request
                            </Button>
                        </Link>
                    </div>

                    {/* Statistics Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                        <StatCard
                            label="Total Requests"
                            value={totalRequests}
                            icon={Home}
                            color="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                            trend={`${approvedRequests} ready to pay`}
                        />
                        <StatCard
                            label="Active Leases"
                            value={activeRequests}
                            icon={TrendingUp}
                            color="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                            trend="Currently living"
                        />
                        <StatCard
                            label="Approved"
                            value={approvedRequests}
                            icon={CheckCircle}
                            color="bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400"
                            trend="Awaiting payment"
                        />
                        <StatCard
                            label="Total Paid"
                            value={`৳ ${(totalPaymentAmount / 1000).toFixed(1)}K`}
                            icon={Zap}
                            color="bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                            trend={`${payments.length} successful payments`}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <Suspense fallback={<div className="text-center py-12">Loading your rentals...</div>}>
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
    icon: Icon,
    color,
    trend,
}: {
    label: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    trend: string;
}) {
    return (
        <div className="group relative rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden">
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative p-6 space-y-4">
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
                    <p className="text-xs text-muted-foreground mt-2">{trend}</p>
                </div>
            </div>
        </div>
    );
}

export default TenantRentalRequestsPage;
