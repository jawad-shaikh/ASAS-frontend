import Button from "@/components/common/Button";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main>

      <section className="bg-[#F7FFFD]">
        <div className="container pt-[100px]">
          <h1 className="text-3xl md:text-[40px] max-w-[932px] text-center mx-auto md:leading-normal">Empower Your Child&apos;s Education with Local Learning Experiences</h1>
          <p className="max-w-[794px] text-center mx-auto mt-8">At ASAS, we understand the importance of personalized and accessible education for your child. Explore a world of enriching learning opportunities right in your community.</p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <Button size={"medium"} variant={"outline"}>Explore</Button>
            <Button size={"medium"}>Get Started</Button>
          </div>
          <Image src="/preview.png" width={1156} height={666} alt="Banner Image" className="top-20 w-full relative" />
        </div>
      </section>

      <section className="bg-[#FFFEE2] mb-10 sm:mb-20 mt-[184px] md:mb-[104px]">
        <div className="container grid md:grid-cols-3 gap-6 py-6">

          <div className="flex items-center gap-4 sm:gap-7">
            <Image src={'/lp/crown.svg'} height={89} width={85} alt="Crown Icon" className="h-[60px] sm:h-[89px]" />
            <div>
              <h2 className="font-medium mb-2">Worlds best instructors</h2>
              <p>3500+ courses</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-7">
            <Image src={'/lp/video-camera.svg'} height={89} width={85} alt="Crown Icon" className="h-[60px] sm:h-[89px]" />
            <div>
              <h2 className="font-medium mb-2">Online & Ofline Classes</h2>
              <p>4,12,000 courses</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-7">
            <Image src={'/lp/tick.svg'} height={89} width={85} alt="Crown Icon" className="h-[60px] sm:h-[89px]" />
            <div>
              <h2 className="font-medium mb-2">Overall active kids learning</h2>
              <p>2,16,000 Students</p>
            </div>
          </div>

        </div>
      </section>

      <section className="py-10 sm:py-20 md:py-[104px] container">
        <h2 className="font-medium text-center text-[32px]">
          About Us
        </h2>
        <p className="max-w-[794px] text-center mx-auto mt-8">
          At Asas, we&apos;re on a mission to revolutionize education by connecting young learners with quality and personalized learning experiences. Here&apos;s why we stand out:
        </p>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 mt-20">

          <div className="border-2 border-black rounded-2xl relative bg-white flex items-center gap-6 px-7 py-10">
            <Image src={'/lp/brain.svg'} height={64} width={64} alt="brain icon" className="h-[64px] w-auto" />
            <div>
              <h3 className="font-medium">
                Empowering Learning Vision
              </h3>
              <p className="font-light mt-2">
                our vision is to empower every child with accessible and enriching educational opportunities, fostering a lifelong love for learning.
              </p>
            </div>
            <div className="border-2 border-black rounded-[20px] bg-[#FFCDD9] absolute -right-1.5 -bottom-1.5 -z-10 h-full w-full" />
          </div>

          <div className="border-2 border-black rounded-2xl relative bg-white flex items-center gap-6 px-7 py-10">
            <Image src={'/lp/light.svg'} height={64} width={64} alt="brain icon" className="h-[64px] w-auto" />
            <div>
              <h3 className="font-medium">
                Trusted Educators for Excellence
              </h3>
              <p className="font-light mt-2">
                We believe in the strength of community-based education, connecting families with nearby courses that are both relevant and impactful for young learners.
              </p>
            </div>
            <div className="border-2 border-black rounded-[20px] bg-[#FFCDD9] absolute -right-1.5 -bottom-1.5 -z-10 h-full w-full" />
          </div>

          <div className="border-2 border-black rounded-2xl relative bg-white flex items-center gap-6 px-7 py-10">
            <Image src={'/lp/mic.svg'} height={64} width={64} alt="brain icon" className="h-[64px] w-auto" />
            <div>
              <h3 className="font-medium">
                Community-Centric Education
              </h3>
              <p className="font-light mt-2">
                We believe in the strength of community-based education, connecting families with nearby courses that are both relevant and impactful for young learners.
              </p>
            </div>
            <div className="border-2 border-black rounded-[20px] bg-[#FFCDD9] absolute -right-1.5 -bottom-1.5 -z-10 h-full w-full" />
          </div>

          <div className="border-2 border-black rounded-2xl relative bg-white flex items-center gap-6 px-7 py-10">
            <Image src={'/lp/board.svg'} height={64} width={64} alt="brain icon" className="h-[64px] w-auto" />
            <div>
              <h3 className="font-medium">
                Seamless Learning Experience
              </h3>
              <p className="font-light mt-2">
                Navigate our user-friendly platform effortlessly, from course discovery to booking and progress tracking, ensuring a stress-free educational journey for you and your child.
              </p>
            </div>
            <div className="border-2 border-black rounded-[20px] bg-[#FFCDD9] absolute -right-1.5 -bottom-1.5 -z-10 h-full w-full" />
          </div>

        </div>
      </section>

      <section className="py-10 sm:py-20 md:py-[104px] container">
        <h2 className="font-medium text-center text-[32px]">
          Why Choose Us
        </h2>
        <p className="max-w-[794px] text-center mx-auto mt-8">
          At Asas, we understand the importance of personalized and accessible education for your child. Explore a world of enriching learning opportunities right in your community.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="px-6 py-10 rounded-lg bg-[#E5FFFF]">
            <Image src={"/lp/learning.svg"} height={60} width={60} alt="learning icon" className="h-[60px] w-auto" />
            <h3 className="mt-5 mb-2 font-medium text-xl">Localized Learning</h3>
            <p className="font-light">Discover educational activities and courses available in your area. We believe in the power of community-based learning.</p>
          </div>

          <div className="px-6 py-10 rounded-lg bg-[#FFF2E6]">
            <Image src={"/lp/instructors.svg"} height={60} width={60} alt="instructors icon" className="h-[60px] w-auto" />
            <h3 className="mt-5 mb-2 font-medium text-xl">Verified Instructors</h3>
            <p className="font-light">Connect with trusted educators, ensuring a safe, enriching environment for high-quality learning experiences.</p>
          </div>

          <div className="px-6 py-10 rounded-lg bg-[#FFFEE2]">
            <Image src={"/lp/booking.svg"} height={60} width={60} alt="booking icon" className="h-[60px] w-auto" />
            <h3 className="mt-5 mb-2 font-medium text-xl">Seamless Booking</h3>
            <p className="font-light">Effortlessly book courses, aligning with your child&apos;s interests and location through our user-friendly platform.</p>
          </div>
        </div>
      </section>

      <section className="relative py-10 sm:py-20 md:py-[104px] container">
          <div className="border-2 border-black rounded-[38px] relative bg-[#495AFF] pb-0 pt-8 px-8 md:p-14">
            <h2 className="text-3xl md:text-[50px] text-white">Promo only <span className="border-2 border-black bg-white text-black rounded-[20px] text-center px-2 shadow-[4px_4px_0px]">160</span>  SAR</h2>
            <p className="text-white text-lg md:text-2xl">Sign Up Now</p>
            <button className="bg-primary py-2 md:py-4 px-8 md:px-12 inline-block mt-8 shadow-[4px_4px_0px_#000000] text-white rounded-full text-lg md:text-2xl">
              Sign Up
            </button>
            <Image src="/cta-banner.png" height={500} width={500} alt="CTA Banner" quality={100} className="w-full md:w-[60%] mt-14 md:mt-0 h-auto relative md:absolute bottom-0 right-0" />
            <div className="border-2 border-black rounded-[47px] bg-[#C26591] absolute -right-2 -bottom-2 -z-10 h-full w-full" />
          </div>
      </section>

    </main>
  );
}
