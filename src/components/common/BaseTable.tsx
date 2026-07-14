import {
  type ColumnDef,
  type ColumnHelper,
  type ColumnMeta,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type Table as TanstackTable,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { cn } from "#/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const availablePageSize = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

type BaseTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  isLoading?: boolean;
  pagination:
    | {
        serverSide: false;
        defaultPageSize?: number;
      }
    | {
        serverSide: true;
        totalData: number;
        pageSize: number;

        /** Starts from 0 */
        currentPage: number;
        onChangePageNumber: (pageNumber: number) => void;
        onChangePageSize: (pageSize: number) => void;
      };
  containerClassName?: string;
  tableClassName?: string;
};

export default function BaseTable<TData>(props: BaseTableProps<TData>) {
  const cachedColumn = useMemo(() => props.columns, [props.columns]);
  const cachedData = useMemo(() => props.data, [props.data]);

  const TABLE = useReactTable({
    data: cachedData,
    columns: cachedColumn,
    enableColumnFilters: true,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel:
      props.pagination && !props.pagination.serverSide
        ? getPaginationRowModel()
        : undefined,
    rowCount: props.pagination?.serverSide
      ? props.pagination.totalData
      : cachedData.length,
    manualPagination: props.pagination
      ? props.pagination.serverSide
      : undefined,
    initialState: {
      pagination: props.pagination?.serverSide
        ? {
            pageIndex: props.pagination.currentPage,
            pageSize: props.pagination.pageSize,
          }
        : props.pagination && !props.pagination.serverSide
          ? {
              pageIndex: 0,
              pageSize: props.pagination.defaultPageSize ?? 10,
            }
          : undefined,
    },
  });

  const handleSetPage = (page: number) => {
    if (page < 0 || page >= TABLE.getPageCount()) return;
    TABLE.setPageIndex(page);
    if (props.pagination?.serverSide) {
      props.pagination.onChangePageNumber(page);
    }
  };
  const handleSetPageSize = (pageSize: number) => {
    TABLE.setPageSize(pageSize);
    if (props.pagination?.serverSide) {
      props.pagination.onChangePageSize(pageSize);
    }
  };

  const getCenterPagination = (): (number | ".")[] => {
    const totalPages = TABLE.getPageCount();
    const currentPage = TABLE.getState().pagination.pageIndex + 1;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, ".", totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, ".", totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [
        1,
        ".",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        ".",
        totalPages,
      ];
    }
  };

  return (
    <div
      className={cn(
        "w-full overflow-auto flex flex-col gap-2",
        props.containerClassName,
      )}
    >
      <Table
        className={cn(props.containerClassName, props.tableClassName, "dark")}
      >
        <TableHeader>
          {TABLE.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      "border-r-gray-100 font-semibold",
                      // header.column.columnDef?.meta?.classes?.thClassName,
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {TABLE.getRowModel().rows.length === 0 &&
            (props.isLoading === undefined || !props.isLoading) && (
              <TableRow>
                <TableCell
                  colSpan={TABLE.getHeaderGroups()[0].headers.reduce(
                    (acc, curr) => acc + curr.colSpan,
                    0,
                  )}
                  className="text-center"
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          {props.isLoading !== undefined && props.isLoading && (
            <TableRow>
              <TableCell
                colSpan={TABLE.getHeaderGroups()[0].headers.reduce(
                  (acc, curr) => acc + curr.colSpan,
                  0,
                )}
                className="text-center"
              >
                Loading...
              </TableCell>
            </TableRow>
          )}
          {TABLE.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className={cn("")}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    // cell.column.columnDef.meta?.classes?.tdClassName,
                  )}
                >
                  {cell.getIsPlaceholder()
                    ? null
                    : flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex gap-2 items-center justify-end-safe">
        {/* Select page */}
        <Select
          items={availablePageSize}
          value={TABLE.getState().pagination.pageSize}
          onValueChange={(value) => handleSetPageSize(Number(value))}
        >
          <span className='text-xs'>Page Size:</span>
          <SelectTrigger className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availablePageSize.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Separator orientation="vertical"/>

        {/* Pagination */}
        <Pagination className="w-fit m-0">
          <PaginationContent>
            {TABLE.getState().pagination.pageIndex > 0 && (
              <PaginationItem>
                <PaginationPrevious               
                  onClick={() => handleSetPage(TABLE.getState().pagination.pageIndex - 1)}
                />
              </PaginationItem>
            )}

            {getCenterPagination().map((page, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: No better key available
              <PaginationItem key={index}>
                {page === "." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={
                      TABLE.getState().pagination.pageIndex === page - 1
                    }
                    onClick={() => handleSetPage(page - 1)}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {TABLE.getState().pagination.pageIndex <
              (TABLE.getPageCount() ?? 0) - 1 && (
              <PaginationItem>
                <PaginationNext onClick={() => handleSetPage(TABLE.getState().pagination.pageIndex + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>

        <Separator orientation="vertical"/>
        <div className='text-xs'>
          Showing {TABLE.getState().pagination.pageIndex * TABLE.getState().pagination.pageSize + 1} - {TABLE.getState().pagination.pageIndex * TABLE.getState().pagination.pageSize + TABLE.getRowModel().rows.length} of {props.pagination?.serverSide ? props.pagination.totalData : TABLE.getPrePaginationRowModel().rows.length} rows
        </div>
      </div>
    </div>
  );
}

/**
 * Create your table columns
 * @template TData Your data type. Please supply the type of each data inside an array. If your data is {id: num, age: num}[], then just omit that []
 * @param fn Function to build your column
 * @returns Column definition
 */
export function makeColumn<TData>(
  fn: (
    colHelper: ColumnHelper<TData>,
  ) => (ColumnDef<TData, unknown> | undefined)[],
): ColumnDef<TData, unknown>[] {
  return fn(createColumnHelper<TData>()).filter((x) => !!x);
}

function getStaticIndex<TData>(row: Row<TData>, table: TanstackTable<TData>) {
  return (
    (table
      .getSortedRowModel()
      ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1
  );
}
export function makeIndexColumn<TData>(
  colHelper: ColumnHelper<TData>,
  options?: {
    meta: ColumnMeta<TData, unknown>;
  },
) {
  return colHelper.display({
    id: "index",
    header: "No.",
    cell: ({ row, table }) =>
      React.createElement(
        "div",
        {
          className: "text-center font-bold",
        },
        getStaticIndex(row, table) + table.getState().pagination.pageIndex * table.getState().pagination.pageSize,
      ),
    meta: options?.meta,
  });
}
