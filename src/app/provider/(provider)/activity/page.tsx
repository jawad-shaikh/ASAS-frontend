"use client";
import {
  deleteActivity,
  getAllActivity,
  getAllActivityByProvider,
  getAllParents,
} from "@/api";
import TableHeader from "@/components/TableHeader";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import useAuthStore from "@/store";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<any>();

export default function ActivityPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [table, setTable] = useState([]);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue().toString(),
      header: () => "No",
    }),
    columnHelper.accessor((row) => (row.title ? `${row.title}` : "-"), {
      id: "title",
      header: "Activity Title",
    }),
    columnHelper.accessor(
      (row) =>
        row.ageRangeStart
          ? `${row.ageRangeStart} - ${row.ageRangeEnd} Years`
          : "-",
      {
        id: "age",
        header: "Age Group",
      }
    ),
    columnHelper.accessor(
      (row) =>
        row.createdAt ? `${new Date(row.createdAt).toLocaleDateString()}` : "-",
      {
        id: "date",
        header: "Date",
      }
    ),
    columnHelper.accessor(
      (row) =>
        `${
          row.isFullCourse && row.isSingleSession
            ? "Full Course / Single Session"
            : !row.isFullCourse
            ? "Single Session"
            : "Full Course"
        }`,
      {
        id: "bookingOption",
        header: "Booking Option",
      }
    ),
    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (props) => (
        <div className="flex gap-2">
          <button
            className="border text-primary border-primary px-6 py-2 rounded-full inline-flex"
            onClick={async () => {
              const id = toast.loading("Deleting activity");
              try {
                await deleteActivity(props.row.original.id);
                toast.success("Activity Deleted", { id });
                getData();
              } catch (error: any) {
                toast.error(error.response.data.error, { id });
              }
            }}
          >
            Delete
          </button>

          <button
            className="bg-primary text-white px-6 py-2 rounded-full inline-flex"
            onClick={() =>
              router.push(`/provider/activity/${props.row.original.id}`)
            }
          >
            Edit
          </button>
        </div>
      ),
    }),
    // Add more columns as needed
  ];

  const getData = async () => {
    const { data } = await getAllActivityByProvider(user?.userId || 0);
    setTable(data.data.activities);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-8">
      <div className="flex items-center justify-between">
        <TableHeader title="Your Activity" />
        <Button
          onClick={() => router.push("/provider/activity/new")}
          size={"small"}
        >
          + Add New Activity
        </Button>
      </div>

      <Table data={table} columns={columns} />
    </div>
  );
}
