/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getTenantsOwnPayments } from '../../_actions/tenantActions';
import { PaymentsList } from '../../_components/_tenant/PaymentList';

const PaymentsPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
    const query = await searchParams;

    const paymentsRes = await getTenantsOwnPayments({ query });
    const payments = paymentsRes?.data || [];

    // Calculate statistics
    const totalPayments = payments.length;
    const completedPayments = payments.filter((p: { status: string; }) => p.status === 'COMPLETED').length;
    const pendingPayments = payments.filter((p: { status: string; }) => p.status === 'PENDING').length;
    const failedPayments = payments.filter((p: { status: string; }) => p.status === 'FAILED').length;
    const totalAmount = payments.reduce((sum: any, p: { amount: any; status: string; }) => 
        p.status === 'COMPLETED' ? sum + (p.amount || 0) : sum, 0
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Header */}
            <div className="relative border-b border-border bg-gradient-to-b from-primary/5 to-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/dashboard">
                            <Button variant="outline" size="icon" className="rounded-lg">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Payment History</h1>
                            <p className="text-lg text-muted-foreground mt-2">Track and manage all your payments</p>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            label="Total Payments"
                            value={totalPayments}
                            icon={CreditCard}
                            color="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                        />
                        <StatCard
                            label="Completed"
                            value={completedPayments}
                            icon={CheckCircle}
                            color="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                        />
                        <StatCard
                            label="Pending"
                            value={pendingPayments}
                            icon={AlertCircle}
                            color="bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400"
                        />
                        <StatCard
                            label="Total Amount Paid"
                            value={`৳ ${(totalAmount / 1000).toFixed(1)}K`}
                            icon={TrendingUp}
                            color="bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Filter Cards */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Payment Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FilterCard
                            label="Completed"
                            count={completedPayments}
                            icon={CheckCircle}
                            color="text-emerald-600 dark:text-emerald-400"
                            bgColor="bg-emerald-50 dark:bg-emerald-950/50"
                        />
                        <FilterCard
                            label="Pending"
                            count={pendingPayments}
                            icon={AlertCircle}
                            color="text-amber-600 dark:text-amber-400"
                            bgColor="bg-amber-50 dark:bg-amber-950/50"
                        />
                        <FilterCard
                            label="Failed"
                            count={failedPayments}
                            icon={AlertCircle}
                            color="text-red-600 dark:text-red-400"
                            bgColor="bg-red-50 dark:bg-red-950/50"
                        />
                    </div>
                </div>

                {/* Payments List */}
                <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">All Payments</h2>
                    <Suspense fallback={<div className="text-center py-12">Loading payments...</div>}>
                        <PaymentsList payments={payments} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

function StatCard({
    label,
    value,
    icon: Icon,
    color,
}: {
    label: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}) {
    return (
        <div className="group relative rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-6 space-y-4">
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
                </div>
            </div>
        </div>
    );
}

function FilterCard({
    label,
    count,
    icon: Icon,
    color,
    bgColor,
}: {
    label: string;
    count: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
}) {
    return (
        <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground font-medium">{label}</p>
                        <p className="text-3xl font-bold text-foreground mt-2">{count}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${bgColor}`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default PaymentsPage;
