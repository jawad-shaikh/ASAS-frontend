'use client'
import { getAllRequest, updateProvider } from "@/api";
import TableHeader from "@/components/TableHeader";
import Table from "@/components/common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<any>();



export default function DashboardPage() {

  const [table, setTable] = useState([]);
  let status = null as any;

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor(
      (row) => (row.firstName ? `${row.firstName} ${row.lastName}` : "-"),
      {
        id: "name",
        header: "Provider Name",
      }
    ),
    columnHelper.accessor(
      (row) => (row.email ? `${row.email}` : "-"),
      {
        id: "email",
        header: "Email",
      }
    ),
    columnHelper.accessor((row) => (row.phoneNumber ? `${row.phoneNumber}` : "-"), {
      id: "telepon",
      header: "Nomor Telepon",
    }),
    columnHelper.accessor(
      (row) => (row.location ? `${row.location}` : "-"),
      {
        id: "location",
        header: "Location",
      }
    ),
    columnHelper.accessor(
      (row) => (row.approvalStatus ? `${row.approvalStatus}` : "-"),
      {
        id: "status",
        header: "Status",
      }
    ),
    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (props) => (
        <div className="flex items-center justify-start gap-4">
          <button
            className="bg-primary text-white px-8 py-2 rounded-full inline-flex"
            onClick={() => {
              status = "APPROVED"
              updateStatus(props.row.original.id)
            }}
          >
            Approve
          </button>

          <button
            className="bg-primary text-white px-8 py-2 rounded-full inline-flex"
            onClick={() => {
              status = "REJECTED"
              updateStatus(props.row.original.id)
            }}
          >
            Reject
          </button>
          
        </div>
      ),
    }),
    // Add more columns as needed
  ];

  const updateStatus = async(id: any) => {
    const loadingToastId = toast.loading('Updating...');
    await updateProvider(id, {status});
    getData()
    toast.success("Provider Updated", { id: loadingToastId });

  }

  const getData  = async () => {
    const {data} = await getAllRequest();
    console.log(data.data)
    setTable(data.data)

  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div className="px-8">
      <TableHeader title="Manage Provider" />
      <Table data={table} columns={columns} />
    </div>
  );
}
