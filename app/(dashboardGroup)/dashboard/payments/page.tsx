/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getTenantsOwnPayments } from '../../_actions/tenantActions';
import { PaymentsList } from '../../_components/_tenant/PaymentList';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';

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
        <div className="space-y-8 animate-fade-in-up">
            <PageHeader title="Payment History" description="Track and manage all your payments">
                <Link href="/dashboard">
                    <Button variant="outline" size="icon" className="rounded-lg">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
            </PageHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Payments"
                    value={totalPayments}
                    icon={CreditCard}
                    variant="blue"
                />
                <StatCard
                    title="Completed"
                    value={completedPayments}
                    icon={CheckCircle}
                    variant="emerald"
                />
                <StatCard
                    title="Pending"
                    value={pendingPayments}
                    icon={AlertCircle}
                    variant="amber"
                />
                <StatCard
                    title="Total Amount Paid"
                    value={`৳ ${(totalAmount / 1000).toFixed(1)}K`}
                    icon={TrendingUp}
                    variant="purple"
                />
            </div>

            {/* Filter Cards */}
            <div>
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
    );
};



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
