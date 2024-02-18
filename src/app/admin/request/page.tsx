'use client'
import { getAllActivities } from "@/api";
import TableHeader from "@/components/TableHeader";
import Table from "@/components/common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<any>();

export default function RequestPage() {

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
      (row) => (row.provider?.email ? `${row.provider.email}` : "-"),
      {
        id: "email",
        header: "Provider",
      }
    ),
    columnHelper.accessor((row) => (row.provider?.firstName ? `${row.provider.firstName} ${row.provider.lastName}` : "-"), {
      id: "username",
      header: "Username",
    }),
    columnHelper.accessor(
      (row) => (row.activityStartDate ? `${new Date(row.activityStartDate).toLocaleDateString()}` : "-"),
      {
        id: "date",
        header: "Date",
      }
    ),
    columnHelper.accessor(
      (row) => (row.activityStartTime ? `${new Date(row.activityStartTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}` : "-"),
      {
        id: "time",
        header: "Time",
      }
    ),
    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (props) => (
        <div className="flex items-center justify-start gap-4">
          <button
            onClick={() => {
              
            }}
          >
            test
          </button>
          
        </div>
      ),
    }),
    // Add more columns as needed
  ];

  const getData  = async () => {
    const {data} = await getAllActivities();
    setTable(data.data)
  }
  
  useEffect(() => {
    getData()
  }, []);
  
  return (
    <div className="px-8">
      <TableHeader title="List of Requests" />
      <Table data={table} columns={columns} />
    </div>
  );
}
