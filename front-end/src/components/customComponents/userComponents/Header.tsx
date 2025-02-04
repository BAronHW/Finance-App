"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Settings } from "lucide-react";
import BlurIn from "@/components/magicui/blur-in";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

import { Account } from "@/__generated__/graphql";
import AccountManagementPopover from "./AccountManagementPopover";

ChartJS.register(ArcElement, ChartTooltip, Legend)

interface Props {
  name: string;
  appMoto: string;
  accBal: number;
  avatarUrl?: string;
  accounts: Account[];
  accountsLoading: boolean;
  userId: number;
  openPlaidLink: Function;
  plaidLinkReady: boolean;
}

function Header({ name, appMoto, accBal, avatarUrl, accounts, accountsLoading, openPlaidLink, plaidLinkReady }: Props) {
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
        plugins: {
            legend: {
                display: false,
            },
        },
        borderRadius: 20,
    }

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
                <Popover>
                  <PopoverTrigger>
                    <Button variant="outline">
                      Manage your bank accounts with Plaid
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <AccountManagementPopover
                      accounts={accounts}
                      openPlaidLink={openPlaidLink}
                      plaidLinkReady={plaidLinkReady}
                      accountsLoading={accountsLoading}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
