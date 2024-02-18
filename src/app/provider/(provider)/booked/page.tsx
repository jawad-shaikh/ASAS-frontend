'use client'
import { getAllOrders } from "@/api";
import TableHeader from "@/components/TableHeader";
import ModalWrapper from "@/components/common/ModalWrapper";
import NestedTable from "@/components/common/NestedTable";
import Table from "@/components/common/Table";
import useAuthStore from "@/store";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<any>();

export default function ActivityPage() {
  const { user } = useAuthStore();
  const [table, setTable] = useState([]);

  const [orders, setOrders] = useState<any>([]);
  const [attendees, setAttendees] = useState<any>([]);


  const [open, setOpen] = useState(false);
  const [attendeesView, setAttendeesView] = useState(false);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor(
      (row) => (row.parent ? `${row.parent.email}` : "-"),
      {
        id: "email",
        header: "Email",
      }
    ),
    columnHelper.accessor(
      (row) => (row.parent ? `${row.parent.fullName}` : "-"),
      {
        id: "name",
        header: "Costumer Name",
      }
    ),
    columnHelper.accessor((row) => (row.createdAt ? `${new Date(row.createdAt).toLocaleDateString()}` : "-"), {
      id: "date",
      header: "Order Date",
    }),
    columnHelper.accessor(
      (row) => (row.OrderDetail ? `${row.OrderDetail.length}` : "-"),
      {
        id: "noOfOrders",
        header: "Number of Orders",
      }
    ),
    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (props) => (
        <div>
          <button
            className="bg-primary text-white px-8 py-2 rounded-full inline-flex"
            onClick={() => {
              setOrders(props.row.original.OrderDetail)
              setOpen(true)
            }}
          >
            View
          </button>

        </div>
      ),
    }),
    // Add more columns as needed
  ];

  const columnsOrders = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor(
      (row) => (row.activity ? `${row.activity.title}` : "-"),
      {
        id: "title",
        header: "Title",
      }
    ),
    columnHelper.accessor(
      (row) => (row.bookingType ? `${row.bookingType}` : "-"),
      {
        id: "bookingType",
        header: "Booking Type",
      }
    ),
    columnHelper.accessor(
      (row) => (row.totalPrice ? `${row.totalPrice}` : "-"),
      {
        id: "totalPrice",
        header: "Total Price",
      }
    ),
    columnHelper.accessor(
      (row) => (row.totalPrice ? `${row.totalPrice}` : "-"),
      {
        id: "totalPrice",
        header: "Total Price",
      }
    ),
    columnHelper.display({
      id: "action",
      header: () => <p>Session Date</p>,
      cell: (props) => (
        props.row.original.SingleSessionDate?.length ? <div className="flex items-center gap-2">
          <select>
            <option selected>View Session Date</option>
            {
              props.row.original.SingleSessionDate.map((item: any) => {
                return <option disabled key={item.id} value={item.id}>{new Date(item.sessionDate).toLocaleDateString()}</option>
              })

            }
          </select>        </div>
          : "-"
      ),
    }),
    columnHelper.display({
      id: "action",
      header: () => <p>Action</p>,
      cell: (props) => (
        <div className="flex items-center gap-2">
          <button
            className="bg-primary text-white px-8 py-2 rounded-full inline-flex"
            onClick={() => {
              setAttendees(props.row.original.OrderAttendees)
              setAttendeesView(true)
            }}
          >
            Order Attendees
          </button>

        </div>
      ),
    }),
    // Add more columns as needed
  ];

  const columnsAttendees = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor(
      (row) => (row.child ? `${row.child.fullName}` : "-"),
      {
        id: "name",
        header: "Name",
      }
    ),
    columnHelper.accessor(
      (row) => (row.child ? `${new Date(row.child.birthDay).toLocaleDateString()}` : "-"),
      {
        id: "birthDay",
        header: "Birth Day",
      }
    ),
  ];

  const getData = async () => {
    const { data } = await getAllOrders();
    console.log(data.data)
    setTable(data.data)
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="px-8">
      <TableHeader title="Your Activity" />
      <Table data={table} columns={columns} />

      <ModalWrapper open={open} setOpen={setOpen}>
        <NestedTable data={orders} columns={columnsOrders} />

        <ModalWrapper open={attendeesView} setOpen={setAttendeesView}>
          <NestedTable data={attendees} columns={columnsAttendees} />
        </ModalWrapper>

      </ModalWrapper>
    </div>
  );
}
