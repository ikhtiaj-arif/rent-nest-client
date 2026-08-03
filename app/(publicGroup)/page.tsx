import CategoriesSection from "@/components/shared/Home/CategoriesSection";
import CTASection from "@/components/shared/Home/CTASection";
import FeaturedProperties from "@/components/shared/Home/FeaturedProperties";
import Footer from "@/components/shared/Home/Footer";
import HeroSection from "@/components/shared/Home/HeroSection";
import HowItWorks from "@/components/shared/Home/HowItWorks";
import Testimonials from "@/components/shared/Home/Testimonials";
import WhyChooseUs from "@/components/shared/Home/WhyChooseUs";
import { getMe } from "@/service/getMe";
import { getCategories, getProperties } from "./_actions/propertyActions";


export default async function Home() {
  const propertiesRes = await getProperties({})
  const categoriesRes = await getCategories()
  const userRes = await getMe()

  const properties = propertiesRes?.data?.data;
  const categories = categoriesRes?.data;
  const user = userRes?.data?.profile;

  return (
    <main>
      <HeroSection user={user} />
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