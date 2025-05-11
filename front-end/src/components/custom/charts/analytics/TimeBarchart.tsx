import { Category, Transaction } from "@/__generated__/graphql";
import { DateRange } from "react-day-picker";
import {
  Bar,
  BarChart,
  BarProps,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import dayjs from "dayjs";
import { DEFAULT_COLOUR } from "@/lib/constants";
import { useMemo } from "react";

type Props = {
  dateRange: DateRange | undefined;
  transactions: Transaction[];
};

const TimeBarchart = ({ dateRange, transactions }: Props) => {
  const chartData = transactions
    .map((transaction) => {
      return {
        date: transaction.date,
        amount: transaction.amount,
        category: transaction.Category,
      };
    })
    .sort((a, b) => a.date - b.date);

  return (
    <div className="p-4">
      <ChartContainer config={{}} className="h-full w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              return dayjs.unix(value).format("D MMM");
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              if (value === 0) return "£0";
              const absValue = Math.abs(Number(value));
              let formattedValue;
              if (absValue >= 1000000) {
                formattedValue = `£${(absValue / 1000000).toFixed(1)}M`;
              } else if (absValue >= 1000) {
                formattedValue = `£${(absValue / 1000).toFixed(0)}k`;
              } else {
                formattedValue = `£${absValue.toFixed(0)}`;
              }
              return formattedValue;
            }}
            allowDecimals={false}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-fit"
                nameKey={"amount"}
                labelFormatter={(_, payload) => {
                  const dataPoint = payload?.[0]?.payload;
                  const categoryName =
                    dataPoint?.category?.name || "Uncategorised";
                  const dateFormatted = dayjs
                    .unix(dataPoint?.date)
                    .format("D MMM");
                  const colour = dataPoint?.category?.colour || DEFAULT_COLOUR;

                  return (
                    <div>
                      <span>{dateFormatted}</span>
                      <span className="flex items-center gap-2">
                        <span>{categoryName}</span>
                        <div
                          style={{ backgroundColor: colour }}
                          className="w-3 h-3 inline-block rounded-sm"
                        />
                      </span>
                    </div>
                  );
                }}
                formatter={(value) => {
                  const label =
                    Number(value) > 0 ? "Spending Amount: " : "Income Amount: ";
                  const displayValue = new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(Math.abs(Number(value)));
                  return [label, displayValue];
                }}
              />
            }
          />
          <Bar dataKey={"amount"} radius={2}>
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.category?.colour || DEFAULT_COLOUR}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default TimeBarchart;
