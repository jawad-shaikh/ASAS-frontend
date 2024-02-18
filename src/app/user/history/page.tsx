import products from "@/constant/siteInfo";
import Image from "next/image";

export default function HistoryPage() {
  return (
    <main className="container pb-10 sm:pb-20 md:pb-[104px]">
      <h1 className="font-medium text-3xl text-center my-12">Order History</h1>

      <section className="flex flex-col gap-10 max-w-[600px] mx-auto">
        {
          products.map(product => (
            <div key={product.title} className="flex items-center gap-8">
              <Image src={product.src} height={100} width={100} alt={`${product.title} image`} className="object-cover h-[100px] w-[100px] rounded-2xl" />
              <div>
                <h2 className="font-medium text-xl">{product.title}</h2>
                <p className="mt-2 text-sm">{product.age}</p>
                <p className="font-medium my-1 text-sm">{product.time}</p>
                {/* <p className="text-primary">Activity Schedule</p> */}
              </div>
            </div>
          ))
        }
      </section>
    </main>
  );
}
