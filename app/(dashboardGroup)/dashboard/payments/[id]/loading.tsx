import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TenantPaymentDetailLoading() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-56" />

            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-24 w-full" />
                </CardContent>
            </Card>
        </div>
    );
}
