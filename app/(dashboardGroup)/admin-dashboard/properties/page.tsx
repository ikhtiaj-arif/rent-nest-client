import { getAllProperties } from "../../_actions/adminActions";
import PropertiesTable from "../../_components/PropertiesTable";
import AdminPropertiesTable from "../../_components/PropertiesTable";



interface Props {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminDashboardPropertiesPage({
    searchParams,
}: Props) {
    const query = await searchParams;

    const res = await getAllProperties({
        query: {
            page: query.page || "1",
            limit: query.limit || "10",
            searchTerm: query.searchTerm,
            city: query.city,
        },
    });
    const properties = res?.data?.data || [];
    const meta = res?.data?.meta;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Properties</h1>
                <p className="text-muted-foreground">
                    View all properties across the platform.
                </p>
            </div>

            <PropertiesTable
                properties={properties}
                meta={meta}
            />
        </div>
    );
}