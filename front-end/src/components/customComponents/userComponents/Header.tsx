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

import { Account } from "@/__generated__/graphql";
import AccountManagementPopover from "./AccountManagementPopover";
import { Palette, Pencil, Plus, Trash2 } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES_BY_USER_ID,
  UPDATE_CATEGORY,
} from "@/lib/graphql/Category";
import CategoryForm from "./CategoryForm";
import { DEFAULT_COLOUR } from "@/lib/constants";
import { ColourPickerPopover } from "./ColourPickerPopover";

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

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES_BY_USER_ID],
  });
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES_BY_USER_ID],
  });
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [GET_CATEGORIES_BY_USER_ID],
  });

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
                <Popover>
                  <PopoverTrigger>
                    <Button variant="outline" size="lg">
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
          <div className="flex flex-col space-x-4">
            <Dialog>
              <DialogTrigger>
                <Button size="lg">Custom Spending Categories</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Define Categories to Organise Your Finances
                  </DialogTitle>
                  <DialogDescription>
                    FinApp allows you to organise all your transactions into
                    various custom defined categories, in order to provide you
                    with personal financial insights in the way you want.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 text-center">
                  {!categoriesLoading &&
                  categoriesData?.getCategoriesByUserId.length
                    ? categoriesData.getCategoriesByUserId.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <h4 className="text-xl font-semibold m-auto">
                            {category.name}
                          </h4>
                          <div className="flex items-center gap-4">
                            <ColourPickerPopover
                              oldColour={category.colour ?? DEFAULT_COLOUR}
                              label={<Palette />}
                              onSaveColour={async (colour: string) =>
                                await updateCategory({
                                  variables: {
                                    id: category.id,
                                    colour,
                                  },
                                })
                              }
                            />
                            <Popover>
                              <PopoverTrigger className="w-max m-auto">
                                <Button variant="secondary">
                                  <Pencil />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent noPortal className="w-[360px]">
                                <CategoryForm
                                  defaultValues={{
                                    name: category.name,
                                    description: category.description,
                                  }}
                                  onSubmit={async (values: {
                                    name: string;
                                    description: string | null;
                                  }) => {
                                    await updateCategory({
                                      variables: {
                                        ...values,
                                        id: category.id,
                                      },
                                    });
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                            <Button
                              variant="destructive"
                              onClick={() =>
                                deleteCategory({
                                  variables: { id: category.id },
                                })
                              }
                              className="justify-end"
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </div>
                      ))
                    : categoriesLoading
                    ? "Loading..."
                    : "No categories"}
                  <Popover>
                    <PopoverTrigger className="w-max m-auto">
                      <Button variant="secondary">
                        <Plus /> New Category
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent noPortal className="w-[360px]">
                      <CategoryForm
                        onSubmit={async (values: {
                          name: string;
                          description: string | null;
                        }) => {
                          await createCategory({
                            variables: {
                              ...values,
                              userId,
                            },
                          });
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </DialogContent>
            </Dialog>
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
