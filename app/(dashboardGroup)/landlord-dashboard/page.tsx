/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IStats, Property, RentalRequest } from '@/lib/types';
import { ArrowRight, Building2, DollarSign, FileText, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { getLandlordDashboardStats, getLandlordOwnProperties, getLandlordRentalRequests } from '../_actions/landlordActions';


export default async function LandlordDashboard() {
    // Fetch all data in parallel
    const [statsRes, propertiesRes, requestsRes] = await Promise.all([
        getLandlordDashboardStats(),
        getLandlordOwnProperties({}),
        getLandlordRentalRequests({}),
    ]);

    const stats:IStats = statsRes?.data || {} ;
    const properties: Property[] = propertiesRes?.data?.data || [];
    const requests: RentalRequest[] = requestsRes?.data?.data || [];

    // Get recent items
    const recentProperties = properties.slice(0, 3);
    const recentRequests = requests.slice(0, 3);

    // Calculate stats
    const activeRequests = requests.filter((r: any) => r.status === 'ACTIVE').length;
    const pendingRequests = requests.filter((r: any) => r.status === 'PENDING').length;
    const approvedRequests = requests.filter((r: any) => r.status === 'APPROVED').length;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative border-b border-border bg-gradient-to-b from-primary/5 to-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                    <div className="space-y-3 mb-12">
                        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Landlord Dashboard
                        </h1>
                        <p className="text-xl text-muted-foreground">Manage your properties and rental requests</p>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard
                            title="My Properties"
                            value={stats?.totalProperties || 0}
                            icon={Building2}
                            description={`${properties.length} total`}
                            color="blue"
                            href="/landlord-dashboard/properties"
                        />
                        <MetricCard
                            title="Rental Requests"
                            value={stats?.totalRentalRequests || 0}
                            icon={FileText}
                            description={`${pendingRequests} pending`}
                            color="emerald"
                            href="/landlord-dashboard/rental-requests"
                        />
                        <MetricCard
                            title="Active Rentals"
                            value={activeRequests}
                            icon={Users}
                            description={`${approvedRequests} approved`}
                            color="amber"
                        />
                        <MetricCard
                            title="Total Revenue"
                            value={`৳ ${(stats?.totalRevenue || 0) / 1000 > 0 ? ((stats?.totalRevenue || 0) / 1000).toFixed(1) + 'K' : '0'}`}
                            icon={DollarSign}
                            description="Monthly earnings"
                            color="purple"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <QuickActionButton href="/landlord-dashboard/properties" label="My Properties" icon={Building2} />
                                    <QuickActionButton href="/landlord-dashboard/rental-requests" label="Rental Requests" icon={FileText} />
                                    <QuickActionButton href="/landlord-dashboard/properties/new" label="Add Property" icon={TrendingUp} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Properties */}
                        {recentProperties.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-foreground">My Properties</h2>
                                    <Link href="/landlord-dashboard/properties">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            View All
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {recentProperties.map((property: any) => (
                                        <div key={property.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-semibold">{property.title}</p>
                                                    <p className="text-sm text-muted-foreground">{property.city} • ৳{property.pricePerMonth}/month</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{property.bedrooms} bed • {property.bathrooms} bath • {property.area} sqft</p>
                                                </div>
                                                <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded">{property.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Requests */}
                        {recentRequests.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-foreground">Recent Requests</h2>
                                    <Link href="/landlord-dashboard/rental-requests">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            View All
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {recentRequests.map((request: any) => (
                                        <div key={request.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-semibold">{request.property?.title}</p>
                                                    <p className="text-sm text-muted-foreground">{request.tenant?.firstName} {request.tenant?.lastName}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">Move-in: {new Date(request.moveInDate).toLocaleDateString()}</p>
                                                </div>
                                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">{request.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Summary */}
                    <div className="space-y-6">
                        {/* Rental Request Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Request Status</CardTitle>
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

                        {/* Property Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Property Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <span className="text-sm text-foreground">Total Properties</span>
                                        <span className="font-bold text-foreground">{properties.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <span className="text-sm text-foreground">Total Requests</span>
                                        <span className="font-bold text-foreground">{requests.length}</span>
                                    </div>
                                </div>
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
    href,
}: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    color: string;
    href?: string;
}) {
    const colorMap: Record<string, string> = {
        blue: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
        emerald: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
        amber: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
        purple: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
    };

    const content = (
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

    return href ? <Link href={href}>{content}</Link> : content;
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
