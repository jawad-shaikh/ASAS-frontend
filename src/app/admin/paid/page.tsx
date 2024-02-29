'use client'
import { approveOrder, getAllOrders, rejectOrder } from "@/api";
import TableHeader from "@/components/TableHeader";
import Button from "@/components/common/Button";
import ModalWrapper from "@/components/common/ModalWrapper";
import NestedTable from "@/components/common/NestedTable";
import Table from "@/components/common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<any>();

export default function PaidPage() {

  const [table, setTable] = useState([

  ]);

  const [image, setImage] = useState("");
  const [isImage, setIsImage] = useState(false);


  const [orders, setOrders] = useState<any>([]);
  const [attendees, setAttendees] = useState<any>([]);

  const [open, setOpen] = useState(false);
  const [attendeesView, setAttendeesView] = useState(false);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor("fillName", {
      header: () => "Full Name",
      cell: (props) => (
        <div className="flex items-center justify-start gap-4">
          <img src={props.row.original.parent.profilePicture || 'https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg'} height={30} width={30} className="w-[30px] h-[30px] rounded-full" alt={props.row.original.fullName} />
          <p>{props.row.original.parent.fullName}</p>

        </div>
      ),
    }),
    columnHelper.accessor((row) => (row.createdAt ? `${row.createdAt}` : "-"), {
      id: "date",
      header: "Date & Time",
    }),
    columnHelper.display({
      id: "action",
      header: () => "Proof of payment",
      cell: (props) => (
        <div>
          <button
            onClick={() => {
              setImage(props.row.original.proofOfPayment)
              setIsImage(true)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </button>

        </div>
      ),
    }),

    columnHelper.display({
      id: "action",
      header: () => "View Order",
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

    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (props) => (
        <div className="flex items-center justify-start gap-4">
          <button
            className="bg-primary text-white px-8 py-2 rounded-full inline-flex"
            onClick={async () => {
              await approveOrder(props.row.original.id)
              getData();
              toast.success("Order Approved successfully")
            }}
          >
            Approve
          </button>

          <button
            className="border border-primary text-primary px-8 py-2 rounded-full inline-flex"
            onClick={async () => {
              await rejectOrder(props.row.original.id)
              getData();
              toast.success("Order Rejected successfully")
            }}
          >
            Reject
          </button>
          
        </div>
      ),
    }),
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
      <TableHeader title="Costumer Paid" />
      <Table data={table} columns={columns} />

      <ModalWrapper open={open} setOpen={setOpen}>
        <NestedTable data={orders} columns={columnsOrders} />
        <ModalWrapper open={attendeesView} setOpen={setAttendeesView}>
          <NestedTable data={attendees} columns={columnsAttendees} />
        </ModalWrapper>
      </ModalWrapper>

      <ModalWrapper open={isImage} setOpen={setIsImage}>
        <div className="p-6 bg-white rounded-xl">
          <h1 className="text-2xl font-semibold">Proof of payment</h1>
          <img src={image} alt="image" className="max-w-[25rem] h-full my-4" />
          <Button size="large" onClick={() => setIsImage(false)}>Close</Button>
        </div>
      </ModalWrapper>

    </div>
  );
}
