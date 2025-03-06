"use client";
import React from "react";
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

import { Account, Category } from "@/__generated__/graphql";
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
import { DEFAULT_COLOUR } from "@/lib/constants";
import { ColourPickerPopover } from "../popovers/ColourPickerPopover";
import { CategoriesDialog } from "../dialogs/CategoriesDialog";

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface Props {
  name: string;
  userId: number;
  appMoto: string;
  accBal: number;
  avatarUrl?: string;
  accounts: Account[];
  accountsLoading: boolean;
  openPlaidLink: Function;
  plaidLinkReady: boolean;
}

function Header({
  name,
  userId,
  appMoto,
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

  const chartData = {
    labels: ["Savings", "Checking", "Investments"],
    datasets: [
      {
        data: [1250, 2500, 3750],
        backgroundColor: ["#1d1d7d", "#4242ed", "#6d6df2"],
        hoverBackgroundColor: ["#1d1d7d", "#4242ed", "#6d6df2"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    borderRadius: 20,
  };

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
              <div className="my-8">
                <AccountManagementPopover
                  accounts={accounts}
                  openPlaidLink={openPlaidLink}
                  plaidLinkReady={plaidLinkReady}
                  accountsLoading={accountsLoading}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-4">
            <CategoriesDialog
              categoriesLoading={categoriesLoading}
              categories={categoriesData?.getCategoriesByUserId}
              userId={userId}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Account Balance</p>
              <p className="text-lg font-semibold">${accBal.toFixed(2)}</p>
            </div>
            <div className="flex space-x-2 items-center">
              <div style={{ width: "60px", height: "60px" }}>
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
