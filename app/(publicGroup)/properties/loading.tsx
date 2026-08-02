import { Skeleton } from "@/components/ui/skeleton";

function PropertyCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border shadow-sm">
            <Skeleton className="aspect-[4/3] w-full rounded-none" />

            <div className="space-y-3 p-5">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-7 w-1/3" />
                <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
        </div>
    );
}

export default function PropertiesLoading() {
    return (
        <section className="min-h-screen bg-background">
            <div className="border-b border-border bg-card/50">
                <div className="container mx-auto px-4 py-8 sm:py-12">
                    <div className="space-y-2">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                            Discover Properties
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Browse rental homes, apartments and premium
                            properties across Bangladesh.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-8 lg:gap-12 lg:flex-row">
                    <aside className="w-full space-y-4 lg:w-72">
                        <Skeleton className="h-10 w-full rounded-lg" />
                        <Skeleton className="h-40 w-full rounded-lg" />
                        <Skeleton className="h-24 w-full rounded-lg" />
                        <Skeleton className="h-24 w-full rounded-lg" />
                    </aside>

                    <div className="flex-1 space-y-6">
                        <Skeleton className="h-10 w-full max-w-md rounded-lg" />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <PropertyCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
