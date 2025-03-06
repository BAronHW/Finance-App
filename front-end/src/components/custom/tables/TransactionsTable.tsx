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

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Account,
  Transaction,
} from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES_BY_USER_ID_FOR_TABLE } from "@/lib/graphql/Category";
import { TransactionTableFilters } from "./TransactionTableFilters";

interface TransactionsTable {
  columns: ColumnDef<Transaction>[];
  data: Transaction[];
  accounts: Account[];
  accountsLoading: boolean;
  userId: number;
}

export type TransactionRow = Row<Transaction>;

function TransactionsTable({
  columns,
  data,
  accounts,
  accountsLoading,
  userId,
}: TransactionsTable) {
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

  const { data: categoriesData, loading: categoriesLoading } = useQuery(
    GET_CATEGORIES_BY_USER_ID_FOR_TABLE,
    {
      variables: {
        userId,
      },
    }
  );

  console.log({ categoriesData });

  return (
    <div>
      <TransactionTableFilters
        table={table}
        categories={categoriesData?.getCategoriesByUserId ?? []}
        accounts={accounts}
      />
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

      {/* <div className="flex place-content-between py-4">
        <div className="flex items-center gap-1 border border-slate-200 rounded-md">
          <Filter height={16} className="ml-2 text-slate-500" />
          <Input
            placeholder="Filter by Merchant Name..."
            value={
              (table.getColumn("merchantName")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("merchantName")
                ?.setFilterValue(event.target.value)
            }
            className="border-0 pl-0"
          />
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                <p className="flex items-center place-content-between gap-1 font-normal text-slate-500">
                  <Filter />
                  Filter by In / Out
                </p>
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
        <div>
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">
                <p className="flex items-center place-content-between gap-1 font-normal text-slate-500">
                  <Filter />
                  Filter by Date
                </p>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <DatePickerWithRange />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <p className="flex items-center place-content-between gap-1 font-normal text-slate-500">
                  <Filter />
                  Column Visibility
                </p>
              </Button>
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
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <p className="flex items-center place-content-between gap-1 font-normal text-slate-500">
                  <Filter />
                  Filter by Account
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {accounts.map((account) => {
                return (
                  <DropdownMenuCheckboxItem
                    className="capitalize"
                    checked={
                      !(
                        table.getColumn("account")?.getFilterValue() as string[]
                      ) // TODO: can try think of an alternative to type assertions
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
        <div className="flex items-center gap-1 border border-slate-200 rounded-md">
          <Filter height={16} className="ml-2 text-slate-500" />
          <Input
            placeholder="Filter by Reference..."
            value={
              (table.getColumn("reference")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("reference")?.setFilterValue(event.target.value)
            }
            className="inline-block max-w-sm border-0 pl-0"
          />
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <p className="flex items-center place-content-between gap-1 font-normal text-slate-500">
                  <Filter />
                  Filter by Category
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {categoriesData &&
                categoriesData.getCategoriesByUserId &&
                categoriesData.getCategoriesByUserId.map(
                  (category: Category) => {
                    return (
                      <DropdownMenuCheckboxItem
                        checked={
                          !(
                            table
                              .getColumn("category")
                              ?.getFilterValue() as (string | undefined)[]
                          ) // can try think of an alternative to type assertions
                            ?.includes(category.name)
                        }
                        onCheckedChange={(checked) => {
                          const filterValue: string[] =
                            (table
                              .getColumn("category")
                              ?.getFilterValue() as string[]) ?? [];
                          console.log({ filterValue });
                          if (!checked) {
                            table
                              .getColumn("category")
                              ?.setFilterValue(
                                filterValue.filter((value) => value !== category.name)
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
                  }
                )}
              <DropdownMenuCheckboxItem
                checked={
                  !(table.getColumn("category")?.getFilterValue() as (string | undefined)[]) // can try think of an alternative to type assertions
                    ?.includes(undefined)
                }
                onCheckedChange={(checked) => {
                  const filterValue: string[] =
                    (table
                      .getColumn("category")
                      ?.getFilterValue() as string[]) ?? [];
                  console.log({ filterValue });
                  if (checked) {
                    table
                      .getColumn("category")
                      ?.setFilterValue(filterValue.filter((value) => !!value));
                  } else {
                    table
                      .getColumn("category")
                      ?.setFilterValue([...filterValue, undefined]);
                  }
                }}
              >
                Uncategorised
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div> */}
