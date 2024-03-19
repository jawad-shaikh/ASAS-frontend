import ProductSlider from "@/components/ProductSlider";
import Hero from "@/components/common/Hero";
import axios from "axios";

export default async function UserPage() {
  const organizedData = {} as any;
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/activities/fetch`
  );

  
  data.data.activities.forEach((item: any) => {
    if (!organizedData[item.category]) {
      organizedData[item.category] = [];
    }
    organizedData[item.category].push(item);
  });

console.log(organizedData, data)

  return (
    <>
    <title>
    Discover Top Activities for Kids | ASAS
    </title>
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
              title="Language Activities"
              description="Drop-in online classes for the whole family"
              products={organizedData.LANGUAGE}
            />
            <ProductSlider
              title="Sports Activities"
              description="Drop-in online classes for the whole family"
              products={organizedData.SPORTS}
            />
          </>
        ) : null}
      </main>
    </>
  );
}
