import { Property } from "@/lib/types";
import { getProperties } from "../_actions/propertyActions";
import PropertiesCard from "./PropertiesCard";
import PropertyPagination from "./PropertyPagination";

interface Props {
    searchParams: Record<string, string | string[] | undefined>;
}

export default async function PropertyGridFetcher({ searchParams }: Props) {
    const res = await getProperties({ query: searchParams });
    const properties: Property[] = res?.data?.data ?? [];
    const meta = res?.data?.meta;

    return (
        <div className="space-y-6">
            <div>
                <p className="font-medium">
                    {meta?.total ?? 0} Properties Found
                </p>
                <p className="text-sm text-muted-foreground">
                    Showing page {meta?.page} of {meta?.totalPage}
                </p>
            </div>

            {properties.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {properties.map((property: Property) => (
                        <PropertiesCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border p-12 text-center">
                    <h3 className="text-xl font-semibold">No Properties Found</h3>
                    <p className="mt-2 text-muted-foreground">
                        Try changing your search or filters.
                    </p>
                </div>
            )}

            <PropertyPagination meta={meta} />
        </div>
    );
}