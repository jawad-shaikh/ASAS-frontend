'use client'
import Navbar from "@/components/common/Navbar";
import useAuthStore from "@/store";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import ProviderSideMenu from "@/components/ProviderSideMenu";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const { user } = useAuthStore();

  useLayoutEffect(() => {
    if (user?.role !== "ACTIVITY_PROVIDER") {
      redirect('/provider')
    }
  }, [user])

  return (
    <html lang="en">
      <body>
        {
          user ? (
            <main className="bg-light-gray flex items-start">
              <ProviderSideMenu />
              <section className="min-w-[calc(100vw-250px)] max-h-screen overflow-y-auto">
                <Navbar user={user} />
                {children}
              </section>
            </main>
          ) : null
        }
      </body>
    </html>
  );
}
