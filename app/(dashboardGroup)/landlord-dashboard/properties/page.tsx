
import { getMe } from "@/service/getMe";
import { getLandlordOwnProperties } from "../../_actions/landlordActions";
import PropertiesTable from "../../_components/PropertiesTable";
import PropertyForm from "../../_components/PropertyForm";
import { PageHeader } from "@/components/shared/PageHeader";


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
        <section className="space-y-6 animate-fade-in-up">

            <PageHeader title="My Properties" description="Manage your listed properties and create new ones.">
                <PropertyForm mode="create" />
            </PageHeader>

            <PropertiesTable
                properties={properties}
                meta={meta}
                currentUserId={userId}
            />

        </section>
    );
};

export default LandlordPropertiesPage;