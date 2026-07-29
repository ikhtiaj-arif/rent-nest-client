import { notFound } from "next/navigation";

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

    const result = await getPropertyById(id);

    if (!result?.success) {
        notFound();
    }

    const property = result.data;

    return (
        <section className="container mx-auto px-4 py-10 space-y-10">

            <PropertyHero property={property} />

            <PropertyInfo property={property} />

            <PropertyLandlord landlord={property.landlord} />

            <PropertyReviews reviews={property.reviews} />

        </section>
    );
};

export default PropertyByIdPage;