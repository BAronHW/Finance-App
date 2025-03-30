"use client";
import React, { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BlurIn from "@/components/magicui/blur-in";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Doughnut } from "react-chartjs-2";
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
import { Palette, Pencil, Plus, Trash2 } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES_BY_USER_ID,
  UPDATE_CATEGORY,
} from "@/lib/graphql/Category";
import CategoryForm from "../forms/CategoryForm";
import { DARK_GRAY, DEFAULT_COLOUR } from "@/lib/constants";
import { ColourPickerPopover } from "../popovers/ColourPickerPopover";
import { CategoriesDialog } from "../dialogs/CategoriesDialog";
import { PieChartComponent } from "../charts/PiechartComponent";

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
  accBal: number;
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
  accBal,
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
  }, [transactionData, categoriesData]);

  const chartData: ChartDataType[] =
    categoriesData?.getCategoriesByUserId.map((category: Category) => {
      return {
        category: category.name,
        spending: spendingPerCategory?.get(category.id),
        fill: category.colour,
      };
    }) ?? [];

  const totalSpending = useMemo(() => {
    if (transactionData.length) {
      return transactionData
        .map((transaction) =>
          transaction.amount >= 0 ? transaction.amount : 0
        )
        .reduce((total, currentValue) => total + currentValue);
    }
  }, [transactionData]);

  if (!totalSpending) {
    return <p>Loading...</p>;
  }

  chartData.push({
    category: "Uncategorised",
    spending:
      totalSpending -
      chartData
        .map((dataPoint: ChartDataType) => dataPoint.spending)
        .reduce((total, currentValue) => total + currentValue, 0),
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
              <p className="text-sm text-muted-foreground">{appMoto}</p>
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
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Total Balance: </h3>
              <h3 className="text-lg font-semibold">
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(totalBalance)}
              </h3>
              <h3 className="text-lg font-semibold">Total Spending: </h3>
              <h3 className="text-lg font-semibold">
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(totalSpending)}
              </h3>
            </div>
            <div className="flex flex-col">
              <PieChartComponent chartData={chartData} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
