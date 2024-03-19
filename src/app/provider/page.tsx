
import ProviderSignUpForm from "@/components/ProviderSignUpForm";
import Button from "@/components/common/Button";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import UserNavbar from "@/components/common/UserNavbar";
import Image from "next/image";
import Link from "next/link";

export default function ProviderPage() {
  return (
    <>
    <title>
    Register Now: Expand Your Impact with ASAS | Reach More Kids
    </title>
      <UserNavbar />
      <main className="bg-gray pb-10 sm:pb-20 md:pb-[104px]">
        <Hero />

        <section className="py-10 sm:py-20 md:py-[104px] container">
          <h2 className="font-medium text-center text-[32px] flex items-center justify-center gap-4">
            Welcome to <Image src="/logo.svg" width={73} height={28} alt="ASAS Logo" />
          </h2>
          <p className="max-w-[800px] text-center mx-auto mt-8">
            As an educator, your journey with us begins here a place where learning meets innovation. Empower young minds and shape the future through interactive and engaging teaching experiences.
          </p>

          <div id="get-started" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <Image src="/provider.png" alt="provider banner" width={500} height={500} className="rounded-md lg:col-span-2 w-full" />
            <ProviderSignUpForm />
          </div>
        </section>

        <section className="py-10 sm:py-20 md:py-[104px] container">
          <h2 className="font-medium text-center text-[32px] flex items-center justify-center gap-4">
            Why Choose Us? <Image src="/logo.svg" width={73} height={28} alt="ASAS Logo" />
          </h2>
          <p className="max-w-[800px] text-center mx-auto mt-8">
            As an educator, your journey with us begins here a place where learning meets innovation. Empower young minds and shape the future through interactive and engaging teaching experiences.
          </p>

          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            <div className="p-4 bg-[#BDB2FF] rounded-xl">
              <h3 className="text-center font-medium">Tailored Learning Experience</h3>
              <p className="text-sm font-thin text-center mt-2">Create personalized lesson plans for children aged 1 to 10, ensuring an adaptive and effective learning journey.</p>
            </div>

            <div className="p-4 bg-[#9BF6FF] rounded-xl">
              <h3 className="text-center font-medium">Dynamic Curriculum</h3>
              <p className="text-sm font-thin text-center mt-2">Access a diverse range of educational materials, resources, and tools designed to enhance your teaching methods.</p>
            </div>

            <div className="p-4 bg-[#CAFFBF] rounded-xl">
              <h3 className="text-center font-medium">Connect with Parents</h3>
              <p className="text-sm font-thin text-center mt-2">Foster a strong partnership with parents by providing regular updates, progress reports, and a seamless communication platform.</p>
            </div>
          </div>

          <div className="p-6 bg-[#EAEAEA] rounded-xl grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2">
              <h3 className="font-medium">Join Us & Shapping Your Minds</h3>
              <p className="text-sm font-thin mt-2">Become a part of ASAS and make a lasting impact on the educational journey of young learners. Together, let&lsquo;s create a foundation for lifelong learning and success.</p>
            </div>
            <Link href={"#get-started"} className="w-full rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              Get Started
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>

  );
}
