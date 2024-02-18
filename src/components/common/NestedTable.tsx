import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Icon } from "./Icons";

const NestedTable = ({ data, columns }: any) => {

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      // globalFilter: search,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onGlobalFilterChange: setSearch,

  });

  return (
    <>
      <div className="overflow-x-auto relative max-w-full bg-white shadow-md">
        <table className="w-full table-auto overflow-scroll border border-gray">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-sm font-medium">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left p-4 whitespace-nowrap">
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? "cursor-pointer select-none flex min-w-[36px]" : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.id === "action" || header.column.id === "status"
                          ? null
                          : {
                            asc: <span className="pl-2">↑</span>,
                            desc: <span className="pl-2">↓</span>,
                          }[header.column.getIsSorted() as string] ?? (
                            <span className="pl-2 flex items-center">
                              <Icon.arrows />
                            </span>
                          )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-sm p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </>
  );
};

export default NestedTable;