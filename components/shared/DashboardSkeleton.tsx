import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props {
    statCount?: number;
    rowCount?: number;
}

export function DashboardSkeleton({ statCount = 4, rowCount = 5 }: Props) {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-4 w-72" />
            </div>

            <div
                className="grid gap-4"
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
                }}
            >
                {Array.from({ length: statCount }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="pb-2">
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="rounded-xl border">
                <div className="border-b p-4">
                    <Skeleton className="h-6 w-40" />
                </div>
                <div className="divide-y">
                    {Array.from({ length: rowCount }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 p-4"
                        >
                            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-3 w-1/4" />
                            </div>
                            <Skeleton className="hidden h-6 w-20 rounded-full sm:block" />
                            <Skeleton className="hidden h-8 w-24 rounded-md md:block" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
