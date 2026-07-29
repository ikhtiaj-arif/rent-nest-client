import { Property } from "@/lib/types";
import { getFilterOptions, getProperties } from "../_actions/propertyActions";
import PropertiesCard from "../_components/PropertiesCard";
import PropertyFilters from "../_components/PropertyFilters";
import PropertyPagination from "../_components/PropertyPagination";
import SearchBar from "../_components/SearchBar";

const PropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
    const query = await searchParams;


    const propertiesRes = await getProperties({ query })

    const filterOptionsRes = await getFilterOptions()


    const properties = propertiesRes.data.data;
    const meta = propertiesRes.data.meta;

    const categories = filterOptionsRes?.data?.categories;
    const cities = filterOptionsRes?.data?.cities;




    return (
        <section className="container mx-auto px-4 py-8">

            {/* Header */}

            <div className="mb-8 space-y-2">

                <h1 className="text-4xl font-bold tracking-tight">
                    Discover Properties
                </h1>

                <p className="text-muted-foreground">
                    Browse rental homes, apartments and premium
                    properties across Bangladesh.
                </p>

            </div>

            {/* Search */}

            <div className="mt-8 flex flex-col gap-8 lg:flex-row">

                {/* Filters */}

                <aside className="lg:w-72 shrink-0">

                    <PropertyFilters
                        categories={categories}
                        cities={cities}
                    />

                </aside>

                {/* Right */}

                <main className="flex-1 space-y-6">

                    {/* Top */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="font-medium">
                                {meta.total} Properties Found
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Showing page {meta.page} of {meta.totalPage}
                            </p>
                        </div>


                        <SearchBar />


                    </div>

                    {/* Grid */}

                    {properties.length ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {properties.map((property: Property) => (
                                <PropertiesCard
                                    key={property.id}
                                    property={property}
                                />
                            ))}

                        </div>
                    ) : (
                        <div className="rounded-xl border p-12 text-center">

                            <h3 className="text-xl font-semibold">
                                No Properties Found
                            </h3>

                            <p className="mt-2 text-muted-foreground">
                                Try changing your search or filters.
                            </p>

                        </div>
                    )}

                    <PropertyPagination meta={meta} />

                </main>

            </div>

        </section>
    );
};

export default PropertiesPage;