import { getPropertyById } from "../../_actions/propertyActions";

const PropertyByIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const property = await getPropertyById(id)
    const propertyData = property?.data
    console.log(propertyData);
    return (
        <div>PropertyByIdPage

        </div>
    );
};

export default PropertyByIdPage;