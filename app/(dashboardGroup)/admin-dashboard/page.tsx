/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { IStats } from '@/lib/types';
import { ArrowRight, Building2, CreditCard, Home, Users } from 'lucide-react';
import Link from 'next/link';
import { getAdminDashboardStats, getAllProperties, getAllRentals, getAllUsers } from '../_actions/adminActions';

export default async function AdminDashboard() {
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

  const recentUsers = users.slice(0, 3);
  const recentProperties = properties.slice(0, 3);

  const activeRentals = rentals.filter((r: any) => r.status === 'ACTIVE').length;
  const pendingRentals = rentals.filter((r: any) => r.status === 'PENDING').length;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader
        title="Admin Dashboard"
        description="Platform-wide overview, key statistics, and management tools."
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers || 0}
          icon={Users}
          description={`${users.length} registered on platform`}
          variant="blue"
          href="/admin-dashboard/users"
        />
        <StatCard
          title="Total Properties"
          value={stats.totalProperties || 0}
          icon={Home}
          description="Active property listings"
          variant="emerald"
          href="/admin-dashboard/properties"
        />
        <StatCard
          title="Active Rentals"
          value={activeRentals}
          icon={Building2}
          description={`${pendingRentals} pending approval`}
          variant="amber"
          href="/admin-dashboard/rentals"
        />
        <StatCard
          title="Total Revenue"
          value={`৳ ${(stats.totalRevenue || 0) / 1000 > 0 ? ((stats.totalRevenue || 0) / 1000).toFixed(1) + 'K' : '0'}`}
          icon={CreditCard}
          description="Platform earnings"
          variant="purple"
        />
      </div>

      {/* Main Grid Layout */}
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
                  <Link href="/admin-dashboard/users">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-xs">Manage Users</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Link href="/admin-dashboard/properties">
                    <Home className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs">View Properties</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Link href="/admin-dashboard/rentals">
                    <Building2 className="w-5 h-5 text-amber-500" />
                    <span className="text-xs">View Rentals</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          {recentUsers.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Users</h2>
                <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
                  <Link href="/admin-dashboard/users">
                    View All <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-3">
                {recentUsers.map((user: any) => (
                  <div key={user.id} className="p-4 border border-border/60 rounded-xl bg-card hover:border-primary/40 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {(user.name || user.firstName || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{user.name || `${user.firstName || ''} ${user.lastName || ''}`}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <StatusBadge status={user.role} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Properties */}
          {recentProperties.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Properties</h2>
                <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
                  <Link href="/admin-dashboard/properties">
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
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Rental Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 text-sm">
                <span className="text-muted-foreground">Active Rentals</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeRentals}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 text-sm">
                <span className="text-muted-foreground">Pending Requests</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{pendingRentals}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 text-sm">
                <span className="text-muted-foreground">Total Requests</span>
                <span className="font-bold">{rentals.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
