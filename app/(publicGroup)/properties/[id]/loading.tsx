import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailsLoading() {
    return (
        <section className="container mx-auto px-4 py-8 space-y-6">
            {/* Hero */}
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                {/* Left Image */}
                <Skeleton className="aspect-[16/10] w-full rounded-2xl" />

                {/* Right Summary Card */}
                <div className="rounded-2xl border p-6 space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-28" />
                        </div>

                        <Skeleton className="h-7 w-20 rounded-full" />
                    </div>

                    <div className="rounded-xl border p-5 space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-40" />
                        <Skeleton className="h-4 w-28" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-lg border p-3 space-y-2"
                            >
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-5 w-10" />
                            </div>
                        ))}
                    </div>

                    <Skeleton className="h-11 w-full rounded-lg" />
                </div>
            </div>

            {/* Property Details Card */}
            <div className="rounded-2xl border p-6 space-y-6">
                <Skeleton className="h-7 w-40" />

                <Skeleton className="h-px w-full" />

                <div className="grid gap-6 md:grid-cols-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4"
                        >
                            <Skeleton className="h-10 w-10 rounded-lg" />

                            <div className="space-y-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                    ))}
                </div>

                <Skeleton className="h-px w-full" />

                <div className="flex items-center justify-between">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                    </div>

                    <div className="space-y-2 text-right">
                        <Skeleton className="ml-auto h-4 w-24" />
                        <Skeleton className="ml-auto h-8 w-36" />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border p-6 space-y-4">
                <Skeleton className="h-7 w-40" />

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Reviews */}
            <div className="space-y-4">
                <Skeleton className="h-7 w-40" />

                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-xl border p-5 space-y-3"
                    >
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>

                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                ))}
            </div>
        </section>
    );
}