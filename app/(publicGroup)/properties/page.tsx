import { Suspense } from "react";
import { getFilterOptions } from "../_actions/propertyActions";
import PropertyFilters from "../_components/PropertyFilters";
import PropertyGridFetcher from "../_components/PropertyGridFetcher";
import SearchBar from "../_components/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";

// Only the grid skeletonises — sidebar stays visible during filter changes
function GridSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border shadow-sm">
                        <Skeleton className="aspect-[4/3] w-full rounded-none" />
                        <div className="space-y-3 p-5">
                            <Skeleton className="h-5 w-20 rounded-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-7 w-1/3" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const PropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
    const query = await searchParams;

    // getFilterOptions is cached for 1 hour — only fetches once,
    // not on every filter click. This is the only fetch the page does.
    // getProperties moved into PropertyGridFetcher so Suspense can
    // show a skeleton while it loads without blocking the sidebar.
    const filterOptionsRes = await getFilterOptions();
    const categories = filterOptionsRes?.data?.categories;
    const cities = filterOptionsRes?.data?.cities;

    return (
        <section className="min-h-screen bg-background">
            {/* Header — renders instantly, no data needed */}
            <div className="border-b border-border bg-card/50">
                <div className="container mx-auto px-4 py-8 sm:py-12">
                    <div className="mb-0 space-y-2">
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

                    {/* Sidebar — renders immediately, never disappears
                        during filter changes because it's outside Suspense */}
                    <aside className="lg:w-72 shrink-0">
                        <PropertyFilters
                            categories={categories}
                            cities={cities}
                        />
                    </aside>

                    <main className="flex-1 space-y-6">
                        <SearchBar />

                        {/*
                            key= is critical — it tells React to treat each
                            unique filter combination as a fresh Suspense
                            boundary, so the skeleton re-shows on every
                            filter change instead of showing stale results
                            while the new fetch is in flight.

                            The sidebar is OUTSIDE this Suspense boundary,
                            so it stays fully visible and interactive while
                            the grid is loading.
                        */}
                        <Suspense
                            key={JSON.stringify(query)}
                            fallback={<GridSkeleton />}
                        >
                            <PropertyGridFetcher searchParams={query} />
                        </Suspense>
                    </main>

                </div>
            </div>
        </section>
    );
};

export default PropertiesPage;