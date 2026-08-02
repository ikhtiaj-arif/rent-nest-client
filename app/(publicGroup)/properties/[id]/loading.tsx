import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailsLoading() {
    return (
        <section className="container mx-auto px-4 py-10 space-y-10">
            {/* Hero / gallery */}
            <div className="space-y-4">
                <Skeleton className="aspect-[16/9] w-full rounded-xl" />
                <div className="flex gap-3">
                    <Skeleton className="h-8 w-32 rounded-full" />
                    <Skeleton className="h-8 w-40 rounded-full" />
                </div>
                <Skeleton className="h-9 w-2/3" />
                <Skeleton className="h-6 w-1/3" />
            </div>

            {/* Info section */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))}
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Landlord card */}
            <div className="flex items-center gap-4 rounded-xl border p-5">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="space-y-2 rounded-lg border p-4">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                ))}
            </div>
        </section>
    );
}
