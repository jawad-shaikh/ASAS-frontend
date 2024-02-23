import ProductSlider from "@/components/ProductSlider";
import Hero from "@/components/common/Hero";
import axios from "axios";

export default async function UserPage() {
  const organizedData = {} as any;
  const { data } = await axios.get(
    "https://cpxrkdz4-6600.inc1.devtunnels.ms/api/v1/activities"
  );

  data.data.forEach((item: any) => {
    if (!organizedData[item.category]) {
      organizedData[item.category] = [];
    }
    organizedData[item.category].push(item);
  });

  return (
    <>
      <main className="bg-gray pb-10 sm:pb-20 md:pb-[104px]">
        <Hero />
        {organizedData ? (
          <>
            <ProductSlider
              title="Art Activities"
              description="Get creative with art classes at home"
              products={organizedData.ART}
            />
            <ProductSlider
              title="Cooking Activities"
              description="Explore new passions with free classes"
              products={organizedData.COOKING}
            />
            <ProductSlider
              title="Robot Activities"
              description="Drop-in online classes for the whole family"
              products={organizedData.ROBOTS}
            />
            <ProductSlider
              title="Music Activities"
              description="Drop-in online classes for the whole family"
              products={organizedData.MUSIC}
            />
            <ProductSlider
              title="Music Activities"
              description="Drop-in online classes for the whole family"
              products={organizedData.MUSIC}
            />
            <ProductSlider
              title="Music Activities"
              description="Drop-in online classes for the whole family"
              products={organizedData.MUSIC}
            />
          </>
        ) : null}
      </main>
    </>
  );
}
