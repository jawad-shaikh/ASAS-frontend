'use client'
import { getAllActivity, getAllParents } from "@/api";
import TableHeader from "@/components/TableHeader";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import useAuthStore from "@/store";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<any>();

export default function ActivityPage() {
  const {user} = useAuthStore();
  const [table, setTable] = useState([
    
  ]);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor(
      (row) => (row.title ? `${row.title}` : "-"),
      {
        id: "title",
        header: "Activity Title",
      }
    ),
    columnHelper.accessor(
      (row) => (row.ageRangeStart ? `${row.ageRangeStart} - ${row.ageRangeEnd} Years` : "-"),
      {
        id: "age",
        header: "Age Group",
      }
    ),
    columnHelper.accessor((row) => (row.createdAt ? `${new Date(row.createdAt).toLocaleDateString()}` : "-"), {
      id: "date",
      header: "Date",
    }),
    columnHelper.accessor(
      (row) => (row.description ? `${row.description}` : "-"),
      {
        id: "description",
        header: "Description",
      }
    ),
    columnHelper.accessor(
      (row) => (row.isFullCourse && `${(row.isFullCourse && row.isSingleSession) ? "Full Course / Single Session" : row.isSingleSession ? "Single Session" : "Full Course"}`),
      {
        id: "bookingOption",
        header: "Booking Option",
      }
    ),
    // Add more columns as needed
  ];

  const getData  = async () => {
    const {data} = await getAllActivity(user?.userId || 0);
    console.log(data.data)
    setTable(data.data)
  }
  
  useEffect(() => {
    getData()
  }, []);
  
  return (
    <div className="px-8">
      <div className="flex items-center justify-between">
      <TableHeader title="Your Activity" />
      <Button size={"small"}>+ Add New Activity</Button>
      </div>

      <Table data={table} columns={columns} />
    </div>
  );
}
