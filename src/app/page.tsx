import products from "@/constant/siteInfo";
import ProductSlider from "@/components/ProductSlider";
import Hero from "@/components/common/Hero";
import UserNavbar from "@/components/common/UserNavbar";
import Footer from "@/components/common/Footer";
import axios from "axios";

export default async function UserPage() {
  const organizedData = {} as any;
  const { data } = await axios.get(
    "http://192.168.0.189:6600/api/v1/activities"
  );

  data.data.forEach((item: any) => {
    if (!organizedData[item.category]) {
      organizedData[item.category] = [];
    }
    organizedData[item.category].push(item);
  });
  console.log(organizedData);

  return (
    <>
      <UserNavbar />
      <main className="bg-gray pb-10 sm:pb-20 md:pb-[104px]">
        <Hero />
        {organizedData ? (
          <>
            <ProductSlider
              title="Virtual Art Class"
              description="Get creative with art classes at home"
              products={organizedData.ART}
            />
            <ProductSlider
              title="Free Activities"
              description="Explore new passions with free classes"
              products={organizedData.COOKING}
            />
            <ProductSlider
              title="Online Classes Today"
              description="Drop-in online classes for the whole family"
              products={organizedData.ROBOTS}
            />
            <ProductSlider
              title="Online Classes Today"
              description="Drop-in online classes for the whole family"
              products={organizedData.MUSIC}
            />
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
