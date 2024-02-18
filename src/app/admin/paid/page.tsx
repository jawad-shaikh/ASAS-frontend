'use client'
import { getAllOrders } from "@/api";
import TableHeader from "@/components/TableHeader";
import Table from "@/components/common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<any>();

export default function PaidPage() {

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
        <p>{props.row.original.parent.fullName}</p>
          
        </div>
      ),
    }),
    columnHelper.accessor(
      (row) => (row.OrderDetail?.activity ? `${row.OrderDetail.activity.title}` : "-"),
      {
        id: "activity",
        header: "Activity Title",
      }
    ),
    columnHelper.accessor((row) => (row.createdAt ? `${row.createdAt}` : "-"), {
      id: "date",
      header: "Date & Time",
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
    const {data} = await getAllOrders();
    console.log(data.data)
    setTable(data.data)
  }
  
  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="px-8">
      <TableHeader title="Costumer Paid" />
      <Table data={table} columns={columns} />
    </div>
  );
}
