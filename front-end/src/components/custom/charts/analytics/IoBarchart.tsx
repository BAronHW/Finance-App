import { Category, Transaction } from "@/__generated__/graphql";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { BarChart, LabelList } from "recharts";
import { DateRange } from "react-day-picker";
import { CartesianGrid, XAxis, Bar, Rectangle } from "recharts";

type Props = {
  dateRange: DateRange | undefined;
  transactions: Transaction[];
};

const CategoryBarchart = ({ dateRange, transactions }: Props) => {
  const chartData = [
    {
      category: "Income",
      total: 0,
      fill: "#82ca9d",
    },
    {
      category: "Expenses",
      total: 0,
      fill: "#8884d8",
    },
  ]
  transactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      chartData[0].total += transaction.amount;
    } else {
      chartData[1].total -= transaction.amount;
    }
  });
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <ChartContainer config={{}} className="w-full h-full">
        <BarChart data={chartData} margin={{ top: 40, bottom: 160 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="category"
            tickLine={false}
            tickMargin={10}
            interval={0}
            axisLine={false}
            tick={{
              fontSize: 12,
              // width: 100,
            }}
            textAnchor="start"
            angle={45}
            tickFormatter={(value) => {
              console.log({ value });
              return value ?? "Uncategorised";
            }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) => {
                  const label = payload[0]?.payload?.category;
                  const colour = payload[0]?.payload?.fill;
                  return (
                    <div className="flex items-center gap-2">
                      {label ?? "Uncategorised"}
                      <div
                        style={{ backgroundColor: colour }}
                        className="w-3 h-3 inline-block rounded-sm"
                      />
                    </div>
                  );
                }}
                formatter={(value) => {
                  const displayValue = new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(value as number);
                  return ["Amount Spent: ", displayValue];
                }}
              />
            }
          />
          <Bar
            dataKey="total"
            strokeWidth={2}
            radius={8}
            activeBar={({ ...props }) => {
              return (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              );
            }}
          >
            <LabelList
              position="top"
              offset={12}
              fill="black"
              dataKey={"total"}
              fontSize={12}
              color="black"
              formatter={(value: number) => {
                const displayValue = new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(value);
                return displayValue;
              }}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default CategoryBarchart;
