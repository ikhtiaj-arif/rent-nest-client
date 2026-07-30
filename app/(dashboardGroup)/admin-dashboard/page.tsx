/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IStats } from '@/lib/types';
import { ArrowRight, Building2, CreditCard, Home, Users } from 'lucide-react';
import Link from 'next/link';
import { getAdminDashboardStats, getAllProperties, getAllRentals, getAllUsers } from '../_actions/adminActions';

export default async function AdminDashboard() {
  // Fetch all data in parallel
  const [statsRes, usersRes, propertiesRes, rentalsRes] = await Promise.all([
    getAdminDashboardStats(),
    getAllUsers({}),
    getAllProperties({}),
    getAllRentals({}),
  ]);

  const stats: IStats = statsRes?.data || {};
  const users = usersRes?.data?.data || [];
  const properties = propertiesRes?.data?.data || [];
  const rentals = rentalsRes?.data?.data || [];

  // Get recent items
  const recentUsers = users.slice(0, 3);
  const recentProperties = properties.slice(0, 3);

  // Calculate stats
  const activeRentals = rentals.filter((r: any) => r.status === 'ACTIVE').length;
  const pendingRentals = rentals.filter((r: any) => r.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="space-y-3 mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">Platform overview and management</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Users"
              value={stats.totalUsers || 0}
              icon={Users}
              description={`${users.length} registered`}
              color="blue"
              href="/admin-dashboard/users"
            />
            <MetricCard
              title="Properties"
              value={stats.totalProperties || 0}
              icon={Home}
              description="Active listings"
              color="emerald"
              href="/admin-dashboard/properties"
            />
            <MetricCard
              title="Active Rentals"
              value={activeRentals}
              icon={Building2}
              description={`${pendingRentals} pending`}
              color="amber"
              href="/admin-dashboard/rentals"
            />
            <MetricCard
              title="Total Revenue"
              value={`৳ ${(stats.totalRevenue || 0) / 1000 > 0 ? ((stats.totalRevenue || 0) / 1000).toFixed(1) + 'K' : '0'}`}
              icon={CreditCard}
              description="Platform revenue"
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
                  <QuickActionButton href="/admin-dashboard/users" label="Manage Users" icon={Users} />
                  <QuickActionButton href="/admin-dashboard/properties" label="View Properties" icon={Home} />
                  <QuickActionButton href="/admin-dashboard/rentals" label="View Rentals" icon={Building2} />
                </div>
              </CardContent>
            </Card>

            {/* Recent Users */}
            {recentUsers.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Recent Users</h2>
                  <Link href="/admin-dashboard/users">
                    <Button variant="outline" size="sm" className="gap-2">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentUsers.map((user: any) => (
                    <div key={user.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{user.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Properties */}
            {recentProperties.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Recent Properties</h2>
                  <Link href="/admin-dashboard/properties">
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
                        </div>
                        <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded">{property.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Rental Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rental Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-foreground">Active</span>
                    <span className="font-bold text-foreground">{activeRentals}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-foreground">Pending</span>
                    <span className="font-bold text-foreground">{pendingRentals}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-foreground">Total</span>
                    <span className="font-bold text-foreground">{rentals.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-foreground">Users</span>
                    <span className="font-bold text-foreground">{users.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-foreground">Properties</span>
                    <span className="font-bold text-foreground">{properties.length}</span>
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
