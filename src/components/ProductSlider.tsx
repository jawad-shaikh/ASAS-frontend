"use client";
import React from "react";
import ProductCard from "./ProductCard";

// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "@/types";

const ProductSlider: React.FC<{
  title: string;
  description: string;
  products: Product[];
}> = ({ title, description, products }) => {
  return (
    <section className="container pt-10 sm:pt-20 md:pt-[104px]">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-medium text-2xl mb-2">{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      {products?.length ? (
        <Swiper
          slidesPerView={5}
          spaceBetween={24}
          navigation={true}
          centeredSlides={true}
          // initialSlide={4}

          loop={true}
          breakpoints={{
            200: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Navigation]}
          className="!py-4 !px-2"
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center max-w-2xl mx-auto my-10">
          Currently, there are no activities available in your area. Please
          enable location services to discover activities nearby, or there might
          not be any activities around your location at the moment.
        </p>
      )}
    </section>
  );
};

export default ProductSlider;
