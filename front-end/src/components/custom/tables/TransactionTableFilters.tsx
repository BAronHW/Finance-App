import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerWithRange } from "../datepickers/DatePickerWithRange";
import {
  Account,
  Category,
  InOrOutEnum,
  Transaction,
} from "@/__generated__/graphql";
import { Table } from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { displayDateRange } from "@/lib/utils";

type Props = {
  table: Table<Transaction>;
  categories: Category[];
  accounts: Account[];
};

export const TransactionTableFilters = ({
  table,
  categories,
  accounts,
}: Props) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const categoryColumn = table.getColumn("category");
  const noCategoriesSelected = categoryColumn
    ? (categoryColumn?.getFilterValue() as (string | undefined)[])?.length ===
      categories.length + 1
    : undefined;

  return (
    <div className="flex place-content-between py-4">
      <div className="flex items-center gap-1 border border-slate-200 rounded-md">
        <Filter height={16} className="ml-2 text-slate-500" />
        <Input
          placeholder="Filter by Merchant Name..."
          value={
            (table.getColumn("merchantName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("merchantName")?.setFilterValue(event.target.value)
          }
          className="border-0 pl-0"
        />
      </div>
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <p className="flex items-center place-content-between gap-1 font-normal text-slate-500">
                <Filter />
                Filter by In / Out
              </p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              onSelect={(event) => {
                event.preventDefault();
              }}
              className="text-center"
              checked={
                !(
                  table.getColumn("io")?.getFilterValue() as InOrOutEnum[]
                )?.includes(InOrOutEnum.In)
              }
              onCheckedChange={(checked) => {
                const column = table.getColumn("io");
                const filterValue =
                  (column?.getFilterValue() as InOrOutEnum[]) ?? [];
                if (checked) {
                  column?.setFilterValue(
                    filterValue.filter((value) => value !== InOrOutEnum.In)
                  );
                } else {
                  column?.setFilterValue([...filterValue, InOrOutEnum.In]);
                }
              }}
            >
              In
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              onSelect={(event) => {
                event.preventDefault();
              }}
              className="text-center"
              checked={
                !(
                  table.getColumn("io")?.getFilterValue() as InOrOutEnum[]
                )?.includes(InOrOutEnum.Out)
              }
              onCheckedChange={(checked) => {
                const column = table.getColumn("io");
                const filterValue =
                  (column?.getFilterValue() as InOrOutEnum[]) ?? [];
                if (checked) {
                  column?.setFilterValue(
                    filterValue.filter((value) => value !== InOrOutEnum.Out)
                  );
                } else {
                  column?.setFilterValue([...filterValue, InOrOutEnum.Out]);
                }
              }}
            >
              Out
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <p className="flex items-center place-content-between gap-1 font-normal text-slate-500">
                <Filter />
                {dateRange ? displayDateRange(dateRange) : "Filter by Date"}
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <DatePickerWithRange
              date={dateRange}
              setDate={(range: DateRange | undefined) => {
                setDateRange(range);
                const column = table.getColumn("date");
                column?.setFilterValue(range);
              }}
            />
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
                    onSelect={(event) => {
                      event.preventDefault();
                    }}
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
                  onSelect={(event) => {
                    event.preventDefault();
                  }}
                  checked={
                    !(table.getColumn("account")?.getFilterValue() as string[]) // TODO: can try think of an alternative to type assertions
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
                          filterValue.filter((value) => value !== account.name)
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
            <DropdownMenuCheckboxItem
              onSelect={(event) => {
                console.log({ filterVal: categoryColumn?.getFilterValue() });
                event.preventDefault();
                if (noCategoriesSelected === undefined) {
                  return;
                } else if (noCategoriesSelected) {
                  const filterValue: (string | undefined)[] = [];
                  categoryColumn?.setFilterValue(filterValue);
                } else {
                  const filterValue: (string | undefined)[] = categories.map(
                    (category) => category.name
                  );
                  filterValue.push(undefined);
                  categoryColumn?.setFilterValue(filterValue);
                }
              }}
              checked={false}
            >
              <p className="font-semibold">
                {categoryColumn
                  ? noCategoriesSelected
                    ? "Select All"
                    : "Deselect All"
                  : "Loading column..."}
              </p>
            </DropdownMenuCheckboxItem>
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <DropdownMenuCheckboxItem
                    onSelect={(event) => {
                      event.preventDefault();
                    }}
                    checked={
                      !(
                        table.getColumn("category")?.getFilterValue() as (
                          | string
                          | undefined
                        )[]
                      ) // can try think of an alternative to type assertions
                        ?.includes(category.name)
                    }
                    onCheckedChange={(checked) => {
                      const filterValue: (string | undefined)[] =
                        (table.getColumn("category")?.getFilterValue() as (
                          | string
                          | undefined
                        )[]) ?? [];
                      if (checked) {
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
            <DropdownMenuCheckboxItem
              onSelect={(event) => {
                event.preventDefault();
              }}
              checked={
                !(
                  table.getColumn("category")?.getFilterValue() as (
                    | string
                    | undefined
                  )[]
                ) // can try think of an alternative to type assertions
                  ?.includes(undefined)
              }
              onCheckedChange={(checked) => {
                const filterValue: string[] =
                  (table.getColumn("category")?.getFilterValue() as string[]) ??
                  [];
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
    </div>
  );
};
