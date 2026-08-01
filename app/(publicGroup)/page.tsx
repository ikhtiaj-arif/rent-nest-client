import CategoriesSection from "@/components/shared/Home/CategoriesSection";
import FeaturedProperties from "@/components/shared/Home/FeaturedProperties";
import HeroSection from "@/components/shared/Home/HeroSection";
import { getCategories, getProperties } from "./_actions/propertyActions";
import WhyChooseUs from "@/components/shared/Home/WhyChooseUs";
import HowItWorks from "@/components/shared/Home/HowItWorks";
import Testimonials from "@/components/shared/Home/Testimonials";
import CTASection from "@/components/shared/Home/CTASection";
import Footer from "@/components/shared/Home/Footer";


export default async function Home() {
  const propertiesRes = await getProperties({})
  const categoriesRes = await getCategories()

  const properties = propertiesRes?.data?.data;
  const categories = categoriesRes?.data;


  return (
    <main>
      <HeroSection />
      <FeaturedProperties properties={properties} />
      <CategoriesSection categories={categories} />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
      {/* 
 
       */}
    </main>
  );
}