import { getPaymentById } from '@/app/(dashboardGroup)/_actions/tenantActions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { AlertCircle, ArrowLeft, CheckCircle, Download, Home, Mail, Printer, XCircle } from 'lucide-react';
import Link from 'next/link';

interface PaymentReceiptPageProps {
    params: Promise<{ id: string }>;
}

export default async function PaymentReceiptPage({
    params,
}: PaymentReceiptPageProps) {
    const { id } = await params;
    const paymentRes = await getPaymentById(id);
    const payment = paymentRes?.data;

    if (!payment) {
        return (
            <div className="min-h-screen bg-background p-4 md:p-8">
                <Link href="/dashboard">
                    <Button variant="outline" className="gap-2 mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </Link>
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-foreground mb-2">Payment Not Found</h1>
                    <p className="text-muted-foreground">This payment receipt doesn&apos;t exist or you don&apos;t have access to it.</p>
                </div>
            </div>
        );
    }

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return {
                    bg: 'bg-emerald-50 dark:bg-emerald-950',
                    text: 'text-emerald-700 dark:text-emerald-300',
                    label: 'Completed',
                    icon: CheckCircle,
                };
            case 'PENDING':
                return {
                    bg: 'bg-amber-50 dark:bg-amber-950',
                    text: 'text-amber-700 dark:text-amber-300',
                    label: 'Pending',
                    icon: AlertCircle,
                };
            case 'FAILED':
                return {
                    bg: 'bg-red-50 dark:bg-red-950',
                    text: 'text-red-700 dark:text-red-300',
                    label: 'Failed',
                    icon: XCircle,
                };
            case 'REFUNDED':
                return {
                    bg: 'bg-slate-50 dark:bg-slate-950',
                    text: 'text-slate-700 dark:text-slate-300',
                    label: 'Refunded',
                    icon: AlertCircle,
                };
            default:
                return {
                    bg: 'bg-muted',
                    text: 'text-muted-foreground',
                    label: status,
                    icon: AlertCircle,
                };
        }
    };

    const statusConfig = getStatusConfig(payment.status);
    const StatusIcon = statusConfig.icon;
    const currencySymbol = payment.currency === 'BDT' ? '৳' : payment.currency || '$';

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/dashboard">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" title="Print Receipt">
                            <Printer className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" title="Download PDF">
                            <Download className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Receipt Container */}
                <Card className="border-2">
                    {/* Receipt Header */}
                    <CardHeader className="pb-4 border-b bg-muted/30">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">Payment Receipt</h1>
                                <p className="text-sm text-muted-foreground">
                                    Receipt ID: <span className="font-mono">{id}</span>
                                </p>
                            </div>
                            <div className={`flex flex-col items-center gap-2 p-4 rounded-lg ${statusConfig.bg}`}>
                                <StatusIcon className={`w-6 h-6 ${statusConfig.text}`} />
                                <Badge className={`${statusConfig.bg} ${statusConfig.text} border-0`}>
                                    {statusConfig.label}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-8 space-y-8">
                        {/* Amount Section */}
                        <div className="text-center space-y-2 pb-8 border-b">
                            <p className="text-muted-foreground text-sm">Amount Paid</p>
                            <div className="text-6xl font-bold text-foreground">
                                {currencySymbol} {payment.amount?.toLocaleString()}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {payment.currency || 'BDT'}
                            </p>
                        </div>

                        {/* Transaction Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-foreground text-lg">Transaction Details</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Transaction ID</span>
                                        <span className="font-mono text-foreground font-semibold">{payment.transactionId || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Payment Date</span>
                                        <span className="text-foreground">{payment.createdAt ? formatDate(payment.createdAt) : 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-muted-foreground">Payment Method</span>
                                        <span className="text-foreground font-semibold">{payment.provider || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-muted-foreground">Payment Status</span>
                                        <span className={`font-semibold ${statusConfig.text}`}>{statusConfig.label}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Property Details */}
                            {payment.rentalRequest && (
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground text-lg">Property Information</h3>
                                    <div className="space-y-3 p-4 rounded-lg bg-muted/50 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs">Property</p>
                                            <p className="text-foreground font-semibold mt-1">
                                                {payment.rentalRequest.property?.title || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs">Location</p>
                                            <p className="text-foreground">
                                                {payment.rentalRequest.property?.city || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="flex justify-between pt-3 border-t">
                                            <span className="text-muted-foreground">Monthly Rent</span>
                                            <span className="font-semibold text-foreground">
                                                ৳ {payment.rentalRequest.property?.price?.toLocaleString() || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Info */}
                        {payment.rentalRequest && (
                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 space-y-2">
                                <div className="flex items-start gap-3">
                                    <Home className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-blue-900 dark:text-blue-100">Related Rental Request</p>
                                        <Link
                                            href={`/dashboard/rental-requests/${payment.rentalRequest.id}`}
                                            className="text-sm text-blue-700 dark:text-blue-300 hover:underline"
                                        >
                                            View full rental details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                            <Button className="flex-1 gap-2" variant="outline">
                                <Mail className="w-4 h-4" />
                                Email Receipt
                            </Button>
                            <Button className="flex-1 gap-2" variant="outline">
                                <Download className="w-4 h-4" />
                                Download PDF
                            </Button>
                            <Button className="flex-1 gap-2" variant="outline">
                                <Printer className="w-4 h-4" />
                                Print
                            </Button>
                        </div>

                        {/* Footer */}
                        <div className="text-center pt-4 border-t text-xs text-muted-foreground space-y-2">
                            <p>Thank you for your payment. This receipt is your proof of payment.</p>
                            <p>If you have any questions, please contact our support team.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
