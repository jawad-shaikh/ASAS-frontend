import Footer from "@/components/common/Footer";
import dynamic from "next/dynamic";
const UserNavbar = dynamic(() => import("@/components/common/UserNavbar"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <UserNavbar />
      {children}
      <Footer />
    </>
  );
}
