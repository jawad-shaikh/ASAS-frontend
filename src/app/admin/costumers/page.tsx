'use client'
import { getAllParents } from "@/api";
import TableHeader from "@/components/TableHeader";
import Table from "@/components/common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<any>();

export default function CostumersPage() {

  const [table, setTable] = useState([
    
  ]);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor("title",{
      header: () => "Full Name",
      cell: (props) => (
        <div className="flex items-center justify-start gap-4">
          <img src={'https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg'} height={30} width={30} className="rounded-full" alt={props.row.original.fullName} />
        <p>{props.row.original.fullName}</p>
          
        </div>
      ),
    }),
    columnHelper.accessor(
      (row) => (row.email ? `${row.email}` : "-"),
      {
        id: "email",
        header: "Email",
      }
    ),
    columnHelper.accessor((row) => (row.address ? `${row.address}` : "-"), {
      id: "address",
      header: "Address",
    }),
    columnHelper.accessor(
      (row) => (row.city ? `${row.city}` : "-"),
      {
        id: "city",
        header: "City",
      }
    ),
    columnHelper.accessor(
      (row) => (row.state ? `${row.state}` : "-"),
      {
        id: "state",
        header: "State",
      }
    ),
    columnHelper.accessor(
      (row) => (row.zipCode ? `${row.zipCode}` : "-"),
      {
        id: "zipCode",
        header: "Zip Code",
      }
    ),
  ];

  const getData  = async () => {
    const {data} = await getAllParents();
    setTable(data.data)
  }
  
  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="px-8">
      <TableHeader title="List of Costumers" />
      <Table data={table} columns={columns} />
    </div>
  );
}
