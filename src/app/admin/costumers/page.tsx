'use client'
import { getAllParents } from "@/api";
import TableHeader from "@/components/TableHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import NestedTable from "@/components/common/NestedTable";
import Table from "@/components/common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<any>();

export default function CostumersPage() {
  const [attendees, setAttendees] = useState<any>([]);
  const [attendeesView, setAttendeesView] = useState(false);

  const [table, setTable] = useState([

  ]);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor("title", {
      header: () => "Full Name",
      cell: (props) => (
        <div className="flex items-center justify-start gap-4">
          <img src={props.row.original.profilePicture || 'https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg'} height={30} width={30} className="w-[30px] h-[30px] rounded-full" alt={props.row.original.fullName} />
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
    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (props) => (
        props.row.original.Child.length ? <div>
          <button
            className="bg-primary text-white px-8 py-2 rounded-full inline-flex"
            onClick={() => {
              setAttendees(props.row.original.Child)
              setAttendeesView(true)
            }}
          >
            View Child
          </button>

        </div>: "-"
      ),
    }),
  ];


  const columnsAttendees = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor(
      (row) => (`${row.fullName}`),
      {
        id: "name",
        header: "Name",
      }
    ),
    columnHelper.accessor(
      (row) => (`${new Date(row.birthDay).toLocaleDateString()}`),
      {
        id: "birthDay",
        header: "Birth Day",
      }
    ),
  ];

  const getData = async () => {
    const { data } = await getAllParents();
    setTable(data.data)
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="px-8">
      <TableHeader title="List of Costumers" />
      <Table data={table} columns={columns} />

      <ModalWrapper open={attendeesView} setOpen={setAttendeesView}>
          <NestedTable data={attendees} columns={columnsAttendees} />
        </ModalWrapper>
    </div>
  );
}
