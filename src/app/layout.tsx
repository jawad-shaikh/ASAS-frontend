import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextTopLoader
          color="#EF6724"
          showSpinner={true}
          shadow="0 0 10px #EF6724,0 0 5px #EF6724"
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
