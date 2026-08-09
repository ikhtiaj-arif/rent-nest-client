/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { IStats, Property, RentalRequest } from '@/lib/types';
import { ArrowRight, Building2, CreditCard, FileText, Plus, Users } from 'lucide-react';
import Link from 'next/link';
import { getLandlordDashboardStats, getLandlordOwnProperties, getLandlordRentalRequests } from '../_actions/landlordActions';
import PropertyForm from '../_components/PropertyForm';

export default async function LandlordDashboard() {
    const [statsRes, propertiesRes, requestsRes] = await Promise.all([
        getLandlordDashboardStats(),
        getLandlordOwnProperties({}),
        getLandlordRentalRequests({}),
    ]);

    const stats: IStats = statsRes?.data || {};
    const properties: Property[] = propertiesRes?.data?.data || [];
    const requests: RentalRequest[] = requestsRes?.data?.data || [];

    const recentProperties = properties.slice(0, 3);
    const recentRequests = requests.slice(0, 3);

    const activeRequests = requests.filter((r: any) => r.status === 'ACTIVE').length;
    const pendingRequests = requests.filter((r: any) => r.status === 'PENDING').length;
    const approvedRequests = requests.filter((r: any) => r.status === 'APPROVED').length;

    return (
        <div className="space-y-8 animate-fade-in-up">
            <PageHeader
                title="Landlord Dashboard"
                description="Manage your listed properties, review tenant applications, and monitor performance."
            >
                <PropertyForm mode="create" />
            </PageHeader>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="My Properties"
                    value={stats?.totalProperties || 0}
                    icon={Building2}
                    description={`${properties.length} total active listings`}
                    variant="blue"
                    href="/landlord-dashboard/properties"
                />
                <StatCard
                    title="Rental Requests"
                    value={stats?.totalRentalRequests || 0}
                    icon={FileText}
                    description={`${pendingRequests} pending applications`}
                    variant="emerald"
                    href="/landlord-dashboard/rental-requests"
                />
                <StatCard
                    title="Active Rentals"
                    value={activeRequests}
                    icon={Users}
                    description={`${approvedRequests} approved tenants`}
                    variant="amber"
                />
                <StatCard
                    title="Total Revenue"
                    value={`৳ ${(stats?.totalRevenue || 0) / 1000 > 0 ? ((stats?.totalRevenue || 0) / 1000).toFixed(1) + 'K' : '0'}`}
                    icon={CreditCard}
                    description="Monthly earnings"
                    variant="purple"
                />
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Quick Actions */}
                    <Card className="border-border/60">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2">
                                    <Link href="/landlord-dashboard/properties">
                                        <Building2 className="w-5 h-5 text-primary" />
                                        <span className="text-xs">My Properties</span>
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2">
                                    <Link href="/landlord-dashboard/rental-requests">
                                        <FileText className="w-5 h-5 text-emerald-500" />
                                        <span className="text-xs">Rental Requests</span>
                                    </Link>
                                </Button>
                                <div className="col-span-2 sm:col-span-1">
                                    <PropertyForm mode="create" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Properties */}
                    {recentProperties.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold tracking-tight text-foreground">My Properties</h2>
                                <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
                                    <Link href="/landlord-dashboard/properties">
                                        View All <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {recentProperties.map((property: any) => (
                                    <div key={property.id} className="p-4 border border-border/60 rounded-xl bg-card hover:border-primary/40 transition-all flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-sm">{property.title}</p>
                                            <p className="text-xs text-muted-foreground">{property.city} • ৳{property.price?.toLocaleString() ?? property.pricePerMonth}/mo</p>
                                        </div>
                                        <StatusBadge status={property.isAvailable ? "AVAILABLE" : "UNAVAILABLE"} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Requests */}
                    {recentRequests.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Applications</h2>
                                <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
                                    <Link href="/landlord-dashboard/rental-requests">
                                        View All <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {recentRequests.map((request: any) => (
                                    <div key={request.id} className="p-4 border border-border/60 rounded-xl bg-card hover:border-primary/40 transition-all flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-sm">{request.property?.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Tenant: {request.tenant?.name || `${request.tenant?.firstName || ''} ${request.tenant?.lastName || ''}`}
                                            </p>
                                        </div>
                                        <StatusBadge status={request.status} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column Summary */}
                <div className="space-y-6">
                    <Card className="border-border/60">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Applications Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 text-sm">
                                <span className="text-muted-foreground">Active Rentals</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeRequests}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 text-sm">
                                <span className="text-muted-foreground">Pending Review</span>
                                <span className="font-bold text-amber-600 dark:text-amber-400">{pendingRequests}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 text-sm">
                                <span className="text-muted-foreground">Approved</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">{approvedRequests}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
