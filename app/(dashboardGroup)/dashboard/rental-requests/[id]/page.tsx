import { getRentalRequestById } from '@/app/(dashboardGroup)/_actions/tenantActions';
import { LandlordCard } from '@/app/(dashboardGroup)/_components/_tenant/LandlordCard';
import PayNowButton from '@/app/(dashboardGroup)/_components/_tenant/PayNowButton';
import ReviewForm from '@/app/(dashboardGroup)/_components/_tenant/ReviewForm';
import { StatusTimeline } from '@/app/(dashboardGroup)/_components/_tenant/StatusTimeline';
import PropertiesCard from '@/app/(publicGroup)/_components/PropertiesCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock, DollarSign, Download, Home, MapPin, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface RentalRequestDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function RentalRequestDetailPage({
    params,
}: RentalRequestDetailPageProps) {
    const { id } = await params;
    const rentalRes = await getRentalRequestById(id);
    const rental = rentalRes?.data;

    if (!rental) {
        return (
            <div className="min-h-screen bg-background p-4 md:p-8">
                <Link href="/dashboard">
                    <Button variant="outline" className="gap-2 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </Link>
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-foreground mb-2">Rental Request Not Found</h1>
                    <p className="text-muted-foreground">This rental request doesn&apos;t exist or you don&apos;t have access to it.</p>
                </div>
            </div>
        );
    }

    // Build timeline based on status
    const getTimelineSteps = () => {
        const allSteps = [
            { status: 'PENDING', label: 'Pending Request', completed: false, current: rental.status === 'PENDING' },
            { status: 'APPROVED', label: 'Approved by Landlord', completed: ['APPROVED', 'ACTIVE', 'COMPLETED'].includes(rental.status), current: rental.status === 'APPROVED' },
            { status: 'ACTIVE', label: 'Lease Active', completed: ['ACTIVE', 'COMPLETED'].includes(rental.status), current: rental.status === 'ACTIVE' },
            { status: 'COMPLETED', label: 'Lease Completed', completed: rental.status === 'COMPLETED', current: false },
        ];
        return allSteps.filter(step => step.status !== 'REJECTED');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return { bg: 'bg-emerald-50 dark:bg-emerald-950', text: 'text-emerald-700 dark:text-emerald-300', label: 'Active' };
            case 'APPROVED':
                return { bg: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-300', label: 'Approved' };
            case 'PENDING':
                return { bg: 'bg-amber-50 dark:bg-amber-950', text: 'text-amber-700 dark:text-amber-300', label: 'Pending' };
            case 'REJECTED':
                return { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-700 dark:text-red-300', label: 'Rejected' };
            case 'COMPLETED':
                return { bg: 'bg-emerald-50 dark:bg-emerald-950', text: 'text-emerald-700 dark:text-emerald-300', label: 'Completed' };
            default:
                return { bg: 'bg-muted', text: 'text-muted-foreground', label: status };
        }
    };

    const statusColor = getStatusColor(rental.status);

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">{rental.property?.title}</h1>
                            <p className="text-muted-foreground flex items-center gap-1 mt-2">
                                <MapPin className="w-4 h-4" />
                                {rental.property?.city}
                            </p>
                        </div>
                    </div>
                    <Badge className={`${statusColor.bg} ${statusColor.text} border-0 text-base px-4 py-2`}>
                        {statusColor.label}
                    </Badge>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Key Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <DollarSign className="w-4 h-4" />
                                            Monthly Rent
                                        </p>
                                        <p className="text-2xl font-bold text-foreground">
                                            ৳ {rental.property?.price?.toLocaleString() || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Move-in Date
                                        </p>
                                        <p className="text-lg font-semibold text-foreground">
                                            {rental.moveInDate ? formatDate(rental.moveInDate) : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Request Date
                                        </p>
                                        <p className="text-lg font-semibold text-foreground">
                                            {rental.createdAt ? formatDate(rental.createdAt) : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Status Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Lease Timeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <StatusTimeline
                                    status={rental?.status} />
                                {/* steps={getTimelineSteps()} /> */}
                            </CardContent>
                        </Card>

                        {/* Property Details */}
                        {rental.property && (
                            <PropertiesCard property={rental.property} />
                        )}
                    </div>

                    {/* Right Column - Sidebar Actions */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Action Buttons */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {rental.status === 'APPROVED' && rental.payment.status !== "COMPLETED" && (
                                    <PayNowButton rentalRequestId={rental.id} />
                                )}
                                {rental.payment.status === "COMPLETED" && (
                                    <ReviewForm
                                        propertyId={rental.property.id}
                                        rentalRequestId={rental.id}
                                    />
                                )}
                                <Button variant="outline" className="w-full gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Contact Landlord
                                </Button>
                                <Button variant="outline" className="w-full gap-2">
                                    <Home className="w-4 h-4" />
                                    View Property
                                </Button>
                                <Button variant="outline" className="w-full gap-2">
                                    <Download className="w-4 h-4" />
                                    Download Agreement
                                </Button>
                                {rental.status === 'PENDING' && (
                                    <Button variant="destructive" className="w-full gap-2">
                                        Cancel Request
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        {/* Landlord Card */}
                        {rental.landlord && (
                            <LandlordCard landlord={{
                                name: rental.landlord.name,
                                email: rental.landlord.email,
                                phone: rental.landlord.phone,
                                // averageRating: rental.landlord.averageRating,
                                // totalReviews: rental.landlord.totalReviews,
                            }} />
                        )}

                        {/* Additional Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Request ID</span>
                                    <span className="font-mono text-foreground">{id}</span>
                                </div>
                                {rental.moveOutDate && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Move-out Date</span>
                                        <span className="text-foreground">{formatDate(rental.moveOutDate)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="text-foreground">{rental.status}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
