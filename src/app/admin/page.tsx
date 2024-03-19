'use client'
import { getReports } from "@/api";
import TableHeader from "@/components/TableHeader";
import { useEffect, useState } from "react";

export default function AdminPage() {
 const [data, setData] = useState<any>({});
  
  const getData = async() => {
    const res = await getReports('admin');
    setData(res.data.data)
  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <>
    <title>
    Dashboard | ASAS Admin Portal

    </title>
    <div className="px-8">
    <TableHeader title="Dashboard" />
    <div className="grid grid-cols-5 gap-4">
      <div className="p-6 rounded-2xl bg-[#E3F5FF]">
        <h2 className="text-sm font-semibold">Total User</h2>
        <p className="text-2xl font-semibold mt-2 mb-4">{data.totalUsers}</p>
      </div>

      <div className="p-6 rounded-2xl bg-[#E5ECF6]">
        <h2 className="text-sm font-semibold">Total Providers</h2>
        <p className="text-2xl font-semibold mt-2 mb-4">{data.totalProviders}</p>
      </div>

      <div className="p-6 rounded-2xl bg-[#E3F5FF]">
        <h2 className="text-sm font-semibold">Total Earnings</h2>
        <p className="text-2xl font-semibold mt-2 mb-4">{data.totalEarnings}</p>
      </div>

      <div className="p-6 rounded-2xl bg-[#E5ECF6]">
        <h2 className="text-sm font-semibold">Total Activities</h2>
        <p className="text-2xl font-semibold mt-2 mb-4">{data.totalActivities}</p>
      </div>
    </div>
  </div>
  </>

  );
}
