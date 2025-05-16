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
import { Account, Transaction } from "@/__generated__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES_BY_USER_ID_FOR_TABLE } from "@/lib/graphql/Category";
import { TransactionTableFilters } from "./TransactionTableFilters";
import { AutoCategoriseWithAiPopover } from "../popovers/AutoCategoriseWithAiPopover";
import {
  CATEGORISE_TRANSACTIONS_WITH_AI,
  GET_TRANSACTIONS_BY_USER_ID,
} from "@/lib/graphql/Transaction";
import { AssignCategoryToSelectedDropdown } from "../dropdowns/AssignCategoryToSelectedDropdown";
import { DateRange } from "react-day-picker";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableSkeleton } from "../skeletons/TableSkeleton";

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

  const [categoriseTransactionsWithAi] = useMutation(
    CATEGORISE_TRANSACTIONS_WITH_AI,
    {
      refetchQueries: [GET_TRANSACTIONS_BY_USER_ID],
    }
  );

  const selectedTransactionIds = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => Number(row.original.id));

  if (categoriesLoading || accountsLoading) {
    return (
      <TableSkeleton />
    )
  }

  return (
    <div>
      <div className="flex place-content-between">
        <div className="align-center flex items-center space-x-2">
          <Checkbox
            id="selectAll"
            onCheckedChange={() => {
              table.toggleAllRowsSelected();
            }}
          />
          <label
            htmlFor="selectAll"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select All Transactions
          </label>
        </div>
        <div className="flex gap-4 justify-center">
          <AutoCategoriseWithAiPopover
            onRunAutoCategorise={(overwrite: boolean) => {
              const selectedIds = table
                .getFilteredSelectedRowModel()
                .rows.map((row) => row.original.id);
              categoriseTransactionsWithAi({
                variables: {
                  ids: selectedIds,
                  overwrite: overwrite,
                },
              });
            }}
          />
          <AssignCategoryToSelectedDropdown
            categories={
              categoriesData ? categoriesData.getCategoriesByUserId : []
            }
            categoriesLoading={categoriesLoading}
            transactionIds={selectedTransactionIds}
            disabled={selectedTransactionIds.length === 0}
          />
        </div>
      </div>
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
