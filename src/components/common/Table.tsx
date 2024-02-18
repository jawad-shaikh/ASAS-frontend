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

const Table = ({ data, columns }: any) => {

  const [sorting, setSorting] = useState<SortingState>([]);
  // const [search, setSearch] = useState<any>("");

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      // globalFilter: search,

      pagination: {
        pageIndex: currentPage,  // Set the initial page index
        pageSize: pageSize,
      },
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
        
        {(data.length && table.getRowModel().rows.length) ?
          <div className="flex items-center justify-between gap-2 p-4">
            <button
              className="flex items-center justify-start gap-4 h-[44px] w-[10rem] border-2 border-light-gray hover:bg-light-gray text-black rounded-md px-4"
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={!table.getCanPreviousPage()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6668 9.16683H6.52516L11.1835 4.5085L10.0002 3.3335L3.3335 10.0002L10.0002 16.6668L11.1752 15.4918L6.52516 10.8335H16.6668V9.16683Z" fill="black" />
              </svg>

              Previous
            </button>
            <div className="flex items-center gap-4">
            {[
              ...Array(
                Math.min(table.getPageCount() - 1, Math.max(0, table.getState().pagination.pageIndex - Math.floor(4 / 2)) + 4 - 1) -
                Math.max(0, table.getState().pagination.pageIndex - Math.floor(4 / 2)) +
                1
              ),
            ].map((_, index) => {
              const pageNumber = Math.max(0, table.getState().pagination.pageIndex - Math.floor(4 / 2)) + index;
              return (
                <button
                  key={index}
                  className={`flex items-center justify-center gap-4 h-[44px] w-[44px] hover:bg-light-gray text-black rounded-md ${table.getState().pagination.pageIndex === pageNumber ? "bg-primary text-white hover:text-black" : ""
                    }`}
                  onClick={() => {
                    setCurrentPage(pageNumber);
                    table.setPageIndex(pageNumber)
                  }}
                  disabled={table.getState().pagination.pageIndex === pageNumber}
                >
                  {pageNumber + 1}
                </button>
              );
            })}
            </div>
          

            <button
              className="flex items-center justify-end gap-4 h-[44px] w-[10rem] border-2 border-light-gray hover:bg-light-gray text-black rounded-md px-4"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="block">Next</span>

              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33317 9.16683H13.4748L8.8165 4.5085L9.99984 3.3335L16.6665 10.0002L9.99984 16.6668L8.82484 15.4918L13.4748 10.8335H3.33317V9.16683Z" fill="black" />
              </svg>

            </button>
          </div> : null}

      </div>

      <div className="flex items-center gap-4 my-6 font-medium text-black">
        <p>Show table</p>
          <div  className="flex items-center gap-2">
          <button className="flex items-center justify-center gap-4 h-[44px] w-[44px] hover:bg-light-gray text-black rounded-md" onClick={(e) => {
            setPageSize(20);
          }}>
          20
        </button>
        <button className="flex items-center justify-center gap-4 h-[44px] w-[44px] hover:bg-light-gray text-black rounded-md" onClick={(e) => {
            setPageSize(60);
          }}>
          60
        </button>
        <button className="flex items-center justify-center gap-4 h-[44px] w-[44px] hover:bg-light-gray text-black rounded-md" onClick={(e) => {
            setPageSize(100);
          }}>
          100
        </button>
          </div>
        
      </div>

    </>
  );
};

export default Table;