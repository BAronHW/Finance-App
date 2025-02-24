import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  AccessorFn,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Account, InOrOutEnum, Transaction } from "@/__generated__/graphql";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePicker } from "./DatePicker";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { Filter } from "lucide-react";

interface TransactionsTable<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  accounts: Account[];
  accountsLoading: boolean;
}

// type TransactionTableType = {
//   id: number;
//   userId?: number | null;
//   accountId?: number | null;
//   Account?: {
//     name: string;
//   } | null;
//   io: InOrOutEnum;
//   name: string;
//   merchantName: string;
//   category?: string;
//   date?: number;
//   amount: number;
// };

export type TransactionRow = Row<Transaction>;

function TransactionsTable<TData, TValue>({
  columns,
  data,
  accounts,
  accountsLoading,
}: TransactionsTable<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const categories = [
    {
      name: "Cat 1",
    },
    {
      name: "Cat 2",
    },
    {
      name: "Cat 3",
    },
  ];

  return (
    <div>
      <div className="flex place-content-between py-4">
        <div className="flex items-center gap-1">
          <Filter />
          <Input
            placeholder={"Filter by Merchant Name..."}
            value={
              (table.getColumn("merchantName")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("merchantName")
                ?.setFilterValue(event.target.value)
            }
          />
        </div>
        <div className="">
          <div className="flex items-center gap-1">
            <Filter />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  className="font-normal text-slate-500"
                >
                  Filter by In / Out
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="text-center"
                  onClick={(event) =>
                    table.getColumn("io")?.setFilterValue(InOrOutEnum.Out)
                  }
                >
                  In
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-center"
                  onClick={(event) =>
                    table.getColumn("io")?.setFilterValue(InOrOutEnum.In)
                  }
                >
                  Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Filter />
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">Filter by Date</Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <DatePickerWithRange />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-1">
            <Filter />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Column Visibility</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Filter />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Filter by Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {accounts.map((account) => {
                  return (
                    <DropdownMenuCheckboxItem
                      className="capitalize"
                      checked={
                        !(
                          table
                            .getColumn("account")
                            ?.getFilterValue() as string[]
                        ) // can try think of an alternative to type assertions
                          ?.includes(account.name)
                      }
                      onCheckedChange={(checked) => {
                        const filterValue: string[] =
                          (table
                            .getColumn("account")
                            ?.getFilterValue() as string[]) ?? [];
                        if (checked) {
                          table
                            .getColumn("account")
                            ?.setFilterValue(
                              filterValue.filter(
                                (value) => value !== account.name
                              )
                            );
                        } else {
                          table
                            .getColumn("account")
                            ?.setFilterValue([...filterValue, account.name]);
                        }
                      }}
                    >
                      {account.name}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-1">
            <Filter />
            <Input
              placeholder="Filter by Reference..."
              value={(table.getColumn("reference")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("reference")?.setFilterValue(event.target.value)
              }
              className="inline-block max-w-sm"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Filter />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Filter by Category</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.map((category) => {
                  return (
                    <DropdownMenuCheckboxItem
                      className="capitalize"
                      checked={
                        !!(
                          table
                            .getColumn("category")
                            ?.getFilterValue() as string[]
                        ) // can try think of an alternative to type assertions
                          ?.includes(category.name)
                      }
                      onCheckedChange={(checked) => {
                        const filterValue: string[] =
                          (table
                            .getColumn("category")
                            ?.getFilterValue() as string[]) ?? [];
                        if (!checked) {
                          table
                            .getColumn("category")
                            ?.setFilterValue(
                              filterValue.filter(
                                (value) => value !== category.name
                              )
                            );
                        } else {
                          table
                            .getColumn("category")
                            ?.setFilterValue([...filterValue, category.name]);
                        }
                      }}
                    >
                      {category.name}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex place-content-between">
        <div></div>
        <div className="text-sm text-muted-foreground mt-6 text-lg">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TransactionsTable;
