/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    Clock,
    CreditCard,
    Home,
    Plus,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { getTenantsOwnPayments, getTenantsOwnRentalRequests } from '../_actions/tenantActions';
import { PaymentCard } from '../_components/_tenant/PaymentCard';
import { RentalRequestCard } from '../_components/_tenant/RentalCard';

export default async function TenantDashboard() {
    // Fetch data in parallel
    const [rentalRequestsRes, paymentsRes] = await Promise.all([
        getTenantsOwnRentalRequests({ query: {} }),
        getTenantsOwnPayments({ query: {} }),
    ]);

    const rentalRequests = rentalRequestsRes?.data?.data || [];
    const payments = paymentsRes?.data || [];

    // Calculate statistics
    const totalRequests = rentalRequests.length;
    const activeRequests = rentalRequests.filter((r: any) => r.status === 'ACTIVE').length;
    const approvedRequests = rentalRequests.filter((r: any) => r.status === 'APPROVED').length;
    const pendingRequests = rentalRequests.filter((r: any) => r.status === 'PENDING').length;

    const completedPayments = payments.filter((p: any) => p.status === 'COMPLETED').length;
    const totalAmountPaid = payments
        .filter((p: any) => p.status === 'COMPLETED')
        .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
    const pendingPayment = payments.filter((p: any) => p.status === 'PENDING').length;

    // Get recent items
    const recentRequests = rentalRequests.slice(0, 3);
    const recentPayments = payments.slice(0, 3);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative border-b border-border bg-gradient-to-b from-primary/5 to-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
                        <div className="space-y-3">
                            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Welcome Back
                            </h1>
                            <p className="text-xl text-muted-foreground">Manage your rentals and payments in one place</p>
                        </div>
                        <Link href={`/properties?isAvailable=true`}>
                            <Button size="lg" className="gap-2 w-full sm:w-auto">
                                <Plus className="w-5 h-5" />
                                New Rental Request
                            </Button>
                        </Link>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard
                            title="Total Rentals"
                            value={totalRequests}
                            icon={Home}
                            description={`${activeRequests} currently active`}
                            color="blue"
                        />
                        <MetricCard
                            title="Active Leases"
                            value={activeRequests}
                            icon={TrendingUp}
                            description="Ongoing rentals"
                            color="emerald"
                        />
                        <MetricCard
                            title="Awaiting Action"
                            value={approvedRequests + pendingRequests}
                            icon={AlertCircle}
                            description={`${pendingRequests} pending, ${approvedRequests} approved`}
                            color="amber"
                        />
                        <MetricCard
                            title="Total Amount Paid"
                            value={`৳ ${(totalAmountPaid / 1000).toFixed(1)}K`}
                            icon={CreditCard}
                            description={`${completedPayments} successful payments`}
                            color="purple"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Quick Actions & Status */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <QuickActionButton
                                        href="/dashboard/rental-requests"
                                        label="View Rentals"
                                        icon={Home}
                                    />
                                    <QuickActionButton
                                        href="/dashboard/payments"
                                        label="View Payments"
                                        icon={CreditCard}
                                    />
                                    <QuickActionButton
                                        href="/properties?isAvailable=true"
                                        label="New Request"
                                        icon={Plus}
                                    />
                                    <QuickActionButton
                                        href="/profile"
                                        label="My Profile"
                                        icon={CheckCircle}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Rental Requests */}
                        {recentRequests.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-foreground">Recent Rental Requests</h2>
                                    <Link href="/dashboard/rental-requests">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            View All
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        {recentRequests.map((request: any) => (
                                            <RentalRequestCard
                                                key={request.id}
                                                id={request.id}
                                                status={request.status}
                                                moveInDate={request.moveInDate}
                                                property={request.property}
                                            />
                                        ))}
                                    </Suspense>
                                </div>
                            </div>
                        )}

                        {/* Recent Payments */}
                        {recentPayments.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-foreground">Recent Payments</h2>
                                    <Link href="/dashboard/payments">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            View All
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Suspense fallback={<div>Loading...</div>}>
                                        {recentPayments.map((payment: any) => (
                                            <PaymentCard
                                                key={payment.id}
                                                id={payment.id}
                                                amount={payment.amount}
                                                currency={payment.currency}
                                                status={payment.status}
                                                provider={payment.provider}
                                                createdAt={payment.createdAt}
                                                rentalRequest={payment.rentalRequest}
                                            />
                                        ))}
                                    </Suspense>
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {rentalRequests.length === 0 && payments.length === 0 && (
                            <Card className="border-dashed">
                                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                    <Home className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                                    <h3 className="text-lg font-semibold text-foreground mb-2">No Rentals Yet</h3>
                                    <p className="text-muted-foreground mb-6 max-w-sm">
                                        Start your rental journey by creating your first request. Explore available properties and make your move today.
                                    </p>
                                    <Link href="/properties?isAvailable=true">
                                        <Button className="gap-2">
                                            <Plus className="w-4 h-4" />
                                            Create First Request
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Summary Cards */}
                    <div className="space-y-6">
                        {/* Payment Status Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Payment Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                                            <span className="text-sm text-foreground">Completed</span>
                                        </div>
                                        <span className="font-bold text-foreground">{completedPayments}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-amber-600" />
                                            <span className="text-sm text-foreground">Pending</span>
                                        </div>
                                        <span className="font-bold text-foreground">{pendingPayment}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rental Status Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Rental Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <span className="text-sm text-foreground">Active</span>
                                        <span className="font-bold text-foreground">{activeRequests}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <span className="text-sm text-foreground">Pending</span>
                                        <span className="font-bold text-foreground">{pendingRequests}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <span className="text-sm text-foreground">Approved</span>
                                        <span className="font-bold text-foreground">{approvedRequests}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Help Card */}
                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                            <CardHeader>
                                <CardTitle className="text-lg">Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                    Find answers to common questions and get support from our team.
                                </p>
                                <Button variant="outline" className="w-full">
                                    Contact Support
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({
    title,
    value,
    icon: Icon,
    description,
    color,
}: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    color: string;
}) {
    const colorMap: Record<string, string> = {
        blue: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
        emerald: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
        amber: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
        purple: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
    };

    return (
        <div className="group relative rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative p-6 space-y-3">
                <div className={`w-12 h-12 rounded-lg ${colorMap[color]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
                    <p className="text-xs text-muted-foreground mt-2">{description}</p>
                </div>
            </div>
        </div>
    );
}

function QuickActionButton({
    href,
    label,
    icon: Icon,
}: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}) {
    return (
        <Link href={href}>
            <Button
                variant="outline"
                className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 hover:bg-primary/5 hover:border-primary/50"
            >
                <Icon className="w-5 h-5" />
                <span className="text-xs text-center">{label}</span>
            </Button>
        </Link>
    );
}
