import { ColumnDef, Row } from "@tanstack/react-table";
import { Transaction } from "@/__generated__/types";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import dayjs from "dayjs"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Account } from "@/__generated__/graphql";
import { TransactionRow } from "./TransactionsTable";

export const TransactionsTableColumns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => getValue() ?? "-"
  },
  {
    accessorFn: (original) => original.Account?.name,
    accessorKey: "account",
    header: "Account Name",
    cell: ({ getValue }) => getValue() ?? "-",
    filterFn: (row: TransactionRow, _columnId: string, filterValue: string[]): boolean => {
      const value = row.getValue("account");
      if (typeof value !== "string") {
        return false;
      }
      return filterValue.includes(value);
    }
  },
  {
    accessorKey: "io",
    header: "In/Out",
    cell: ({ getValue }) => getValue() ?? "-"
  },
  {
    accessorKey: "merchantName",
    header: "Sender / Recipient",
    cell: ({ getValue }) => getValue() ?? "-"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => getValue() ?? "-"
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue();
      if (typeof value === "number") {
        return dayjs(1000 * value).format("DD/MM/YYYY")
      }
    }
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ getValue }) => getValue() ?? "-"
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => getValue() ?? "-"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(transaction.id.toString())
              }
            >
              Copy Transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Transaction</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
