"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartDataType } from "../header/Header";
import { DARK_GRAY } from "@/lib/constants";
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";

type Props = {
  chartData: ChartDataType[];
  dateRange: DateRange | undefined;
  totalOut: number;
  borderOff?: boolean;
  titleOff?: boolean;
  dateLabelOff?: boolean;
};

export function PieChartComponent({ chartData, dateRange, totalOut, borderOff, titleOff, dateLabelOff }: Props) {
  const chartConfig: Record<string, Record<string, string>> = {};
  chartData.forEach((dataPoint) => {
    chartConfig[dataPoint.category] = {
      label: dataPoint.category,
      color: dataPoint.fill,
    };
  });
  chartConfig satisfies ChartConfig;

  console.log({ chartData });
  return (
    <Card className={"flex flex-col" + (borderOff ? " border-0" : "")}>
      <CardHeader className="items-center pb-0">
        {titleOff ? null : <CardTitle>Spending by Category</CardTitle>}
        {dateLabelOff ? null : <CardDescription>
          Date Range: {formatDateRange(dateRange)}
        </CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-[400px] my-[-25px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                totalOut > 0 ? (
                  <ChartTooltipContent
                    labelFormatter={(value, payload) =>
                      new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      }).format(Number(payload[0].value))
                    }
                    hideValue
                  />
                ) : (
                  <ChartTooltipContent
                    labelFormatter={() =>
                      new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      }).format(0)
                    }
                    hideValue
                  />
                )
              }
            />
            <Pie data={chartData} dataKey="spending" nameKey="category" />
            {totalOut === 0 && (
              <Pie
                data={[
                  {
                    spending: 1,
                    label: "-",
                    category: "No expenditure in the selected range:",
                    fill: DARK_GRAY,
                  },
                ]}
                dataKey="spending"
                nameKey="category"
              />
            )}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const formatDateRange = (dateRange: DateRange | undefined) => {
  if (!dateRange) {
    return "All Time";
  } else if (dateRange.from && dateRange.to) {
    return (
      dayjs(dateRange.from).format("DD/MM/YYYY") +
      " - " +
      dayjs(dateRange.to).format("DD/MM/YYYY")
    );
  } else if (dateRange.from) {
    return dayjs(dateRange.from).format("DD/MM/YYYY") + " - Any";
  } else if (dateRange.to) {
    return "Any -" + dayjs(dateRange.to).format("DD/MM/YYYY");
  } else {
    return "All Time";
  }
};
