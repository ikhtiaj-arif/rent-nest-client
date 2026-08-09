import { getAllProperties } from "../../_actions/adminActions";
import PropertiesTable from "../../_components/PropertiesTable";
import AdminPropertiesTable from "../../_components/PropertiesTable";
import { PageHeader } from "@/components/shared/PageHeader";


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
        <div className="space-y-6 animate-fade-in-up">
            <PageHeader title="All Properties" description="Browse and manage all property listings across the platform." />

            <PropertiesTable
                properties={properties}
                meta={meta}
            />
        </div>
    );
}