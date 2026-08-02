import { notFound } from "next/navigation";

import { getMe } from "@/service/getMe";
import { getPropertyById } from "../../_actions/propertyActions";
import PropertyHero from "../../_components/PropertyHero";
import PropertyInfo from "../../_components/PropertyInfo";
import PropertyLandlord from "../../_components/PropertyLandlord";
import PropertyReviews from "../../_components/PropertyReviews";



const PropertyByIdPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const user = await getMe();
    const result = await getPropertyById(id);

    if (!result?.success) {
        notFound();
    }

    const property = result.data;
    console.log("PropertyByIdPage", property);

    return (
        <section className="container mx-auto px-4 py-10 space-y-10">

            <PropertyHero property={property} isAuthenticated={user?.success} />

            <PropertyInfo property={property} />

            <PropertyLandlord landlord={property.landlord} />

            <PropertyReviews reviews={property.reviews} />

        </section>
    );
};

export default PropertyByIdPage;