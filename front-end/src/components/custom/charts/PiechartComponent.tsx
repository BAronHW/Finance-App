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

type Props = {
  chartData: ChartDataType[];
};

export function PieChartComponent({ chartData }: Props) {
  const chartConfig: Record<string, Record<string, string>> = {};
  chartData.forEach((dataPoint) => {
    chartConfig[dataPoint.category] = {
      label: dataPoint.category,
      color: dataPoint.fill,
    };
  });
  chartConfig satisfies ChartConfig;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  valueFormatter={(value) =>
                    new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(Number(value.toString()))
                  }
                />
              }
            />
            <Pie data={chartData} dataKey="spending" nameKey="category" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
