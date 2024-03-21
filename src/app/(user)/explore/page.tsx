"use client";
import ProductSlider from "@/components/ProductSlider";

import Hero from "@/components/common/Hero";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [data, setData] = useState({} as any);

  const fetchData = async(location : any) => {
    const organizedData = {} as any;
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/activities/fetch`, location
    );

    data.data.activities.forEach((item: any) => {
      if (!organizedData[item.category]) {
        organizedData[item.category] = [];
      }
      organizedData[item.category].push(item);
    });

    setData(organizedData)
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await navigator.geolocation.getCurrentPosition(async (pos) => {
            fetchData({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
           
        });
      } catch (err: any) {
        console.log(err.message);
      }
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation()
  }, []);

  return (
    <>
      <title>Discover Top Activities for Kids | ASAS</title>
      <main className="bg-gray pb-10 sm:pb-20 md:pb-[104px]">
        <Hero />
        {data ? (
          <>
            <ProductSlider
              title="Art Activities"
              description="Get creative with art classes at home"
              products={data.ART}
            />
            <ProductSlider
              title="Cooking Activities"
              description="Explore new passions with free classes"
              products={data.COOKING}
            />
            <ProductSlider
              title="Robot Activities"
              description="Drop-in online classes for the whole family"
              products={data.ROBOTS}
            />
            <ProductSlider
              title="Music Activities"
              description="Drop-in online classes for the whole family"
              products={data.MUSIC}
            />
            <ProductSlider
              title="Language Activities"
              description="Drop-in online classes for the whole family"
              products={data.LANGUAGE}
            />
            <ProductSlider
              title="Sports Activities"
              description="Drop-in online classes for the whole family"
              products={data.SPORTS}
            />
          </>
        ) : null}
      </main>
    </>
  );
}
