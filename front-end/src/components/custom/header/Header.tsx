"use client";
import React, { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import BlurIn from "@/components/magicui/blur-in";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

import {
  Account,
  Category,
  InOrOutEnum,
  Transaction,
} from "@/__generated__/graphql";
import AccountManagementPopover from "../popovers/AccountManagementPopover";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES_BY_USER_ID } from "@/lib/graphql/Category";
import { DARK_GRAY } from "@/lib/constants";
import { CategoriesDialog } from "../dialogs/CategoriesDialog";
import { PieChartComponent } from "../charts/PiechartComponent";
import { DatePickerWithRange } from "../datepickers/DatePickerWithRange";
import { DateRange } from "react-day-picker";
import { isInDateRange } from "@/lib/utils";

ChartJS.register(ArcElement, ChartTooltip, Legend);

export type ChartDataType = {
  category: string;
  spending: number;
  fill: string;
};

interface Props {
  name: string;
  userId: number;
  appMoto: string;
  avatarUrl?: string;
  accounts: Account[];
  transactionData: Transaction[];
  accountsLoading: boolean;
  openPlaidLink: Function;
  plaidLinkReady: boolean;
}

function Header({
  name,
  userId,
  appMoto,
  transactionData,
  avatarUrl,
  accounts = [],
  accountsLoading,
  openPlaidLink,
  plaidLinkReady,
}: Props) {
  const { data: categoriesData, loading: categoriesLoading } = useQuery(
    GET_CATEGORIES_BY_USER_ID,
    { variables: { userId } }
  );

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const totalBalance = accounts
    .map((account) => account.current ?? 0)
    .reduce((total, currentValue) => total + currentValue, 0);

  const spendingPerCategory = useMemo(() => {
    if (
      transactionData.length &&
      categoriesData &&
      categoriesData?.getCategoriesByUserId
    ) {
      const map = new Map<number | null, number>();
      categoriesData.getCategoriesByUserId.forEach((category: Category) => {
        map.set(category.id, 0);
      });
      map.set(null, 0);
      transactionData
        .filter((transaction) => transaction.io === InOrOutEnum.Out)
        .filter((transaction) =>
          dateRange ? isInDateRange(dateRange, transaction.date) : true
        )
        .forEach((transaction: Transaction) => {
          if (map.has(transaction.categoryId ?? null)) {
            const current = map.get(transaction.categoryId ?? null)!;
            map.set(
              transaction.categoryId ?? null,
              current + transaction.amount
            );
          }
        });
      return map;
    }
  }, [transactionData, categoriesData, dateRange]);

  const chartData: ChartDataType[] =
    categoriesData?.getCategoriesByUserId.map((category: Category) => {
      return {
        category: category.name,
        spending: spendingPerCategory?.get(category.id),
        fill: category.colour,
      };
    }) ?? [];

  const totalOut = useMemo(() => {
    if (transactionData.length) {
      return transactionData
        .filter((transaction) =>
          dateRange ? isInDateRange(dateRange, transaction.date) : true
        )
        .map((transaction) =>
          transaction.amount >= 0 ? transaction.amount : 0
        )
        .reduce((total, currentValue) => total + currentValue, 0);
    }
  }, [transactionData, dateRange]);

  const totalIn = useMemo(() => {
    if (transactionData.length) {
      return transactionData
        .filter((transaction) =>
          dateRange ? isInDateRange(dateRange, transaction.date) : true
        )
        .map((transaction) => (transaction.amount < 0 ? transaction.amount : 0))
        .reduce((total, currentValue) => total - currentValue, 0);
    }
  }, [transactionData, dateRange]);

  chartData.push({
    category: "Uncategorised",
    spending: totalOut
      ? totalOut -
        chartData
          .map((dataPoint: ChartDataType) => dataPoint.spending)
          .reduce((total, currentValue) => total + currentValue, 0)
      : 0,
    fill: DARK_GRAY,
  });

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm z-50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-semibold z-10">
                Welcome,{" "}
                <BlurIn
                  word={name}
                  className="text-sm font-bold text-black"
                  duration={0.5}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4">{appMoto}</p>
              <div className="flex flex-col gap-6 my-12">
                <AccountManagementPopover
                  accounts={accounts}
                  openPlaidLink={openPlaidLink}
                  plaidLinkReady={plaidLinkReady}
                  accountsLoading={accountsLoading}
                />
                <CategoriesDialog
                  categoriesLoading={categoriesLoading}
                  categories={categoriesData?.getCategoriesByUserId}
                  userId={userId}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">
              Total Balance:{" "}
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(totalBalance)}
            </h3>
            <DatePickerWithRange
              date={dateRange}
              setDate={(range: DateRange | undefined) => setDateRange(range)}
            />
            <h3 className="flex place-content-between text-lg font-medium">
              <p>Total Out:</p>
              <p>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(totalOut ?? 0)}
              </p>
            </h3>
            <h3 className="flex place-content-between text-lg font-medium">
              <p>Total In:</p>
              <p>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(totalIn ?? 0)}
              </p>
            </h3>
          </div>
          <div className="flex flex-col">
            <PieChartComponent
              chartData={chartData}
              dateRange={dateRange}
              totalOut={totalOut ?? 0}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
