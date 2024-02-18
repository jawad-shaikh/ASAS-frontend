'use client'
import AdminSideMenu from "@/components/AdminSideMenu";
import Navbar from "@/components/common/Navbar";
import useAuthStore from "@/store";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const { user } = useAuthStore();

  useLayoutEffect(() => {
    if (user?.role !== "ADMIN") {
      redirect('/')

    }
  }, [user])

  return (
    <html lang="en">
      <body>
        {
          user ? (
            <main className="bg-light-gray flex items-start">
              <AdminSideMenu />
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
