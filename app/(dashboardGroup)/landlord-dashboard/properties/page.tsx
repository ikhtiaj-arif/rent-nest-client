
import { getMe } from "@/service/getMe";
import { getLandlordOwnProperties } from "../../_actions/landlordActions";
import PropertiesTable from "../../_components/PropertiesTable";
import PropertyForm from "../../_components/PropertyForm";



const LandlordPropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
    const query = await searchParams;

    const user = await getMe();
    const result = await getLandlordOwnProperties({ query });
    const properties = result?.data?.data || [];
    const meta = result?.data?.meta;
    const userId = user?.data?.profile?.id;
    

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

            <PropertiesTable
                properties={properties}
                meta={meta}
                currentUserId={userId}
            />

        </section>
    );
};

export default LandlordPropertiesPage;