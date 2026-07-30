
import PropertyForm from "../../_components/PropertyForm";

import { getOwnProperties } from "../../_actions/landlordActions";
import DashboardPropertyList from "../../_components/PropertyListProps";

const LandlordPropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
    const query = await searchParams;

    const result = await getOwnProperties({ query });

    return (
        <section className="space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        My Properties
                    </h1>

                    <p className="text-muted-foreground">
                        Manage your rental listings.
                    </p>
                </div>

                <PropertyForm mode="create" />
            </div>

            <DashboardPropertyList
                properties={result?.data?.data}
                meta={result?.data.meta}
            />

        </section>
    );
};

export default LandlordPropertiesPage;