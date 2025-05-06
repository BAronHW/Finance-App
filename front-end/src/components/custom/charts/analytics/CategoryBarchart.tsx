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
  categories: Category[];
  transactions: Transaction[];
};

const CategoryBarchart = ({ dateRange, categories, transactions }: Props) => {
  const dataByCategory: Record<
    string,
    Record<string, string | number | undefined | null>
  > = {};
  categories.forEach((category) => {
    dataByCategory[category.name] = {
      category: category.name,
      total: 0,
      fill: category.colour,
    };
  });
  transactions.forEach((transaction) => {
    if (transaction?.Category?.name) {
      const category = dataByCategory[transaction.Category.name];
      if (
        category &&
        typeof category.total === "number" &&
        transaction.amount > 0
      ) {
        category.total += transaction.amount;
      }
    }
  });
  const chartData = Array.from(Object.values(dataByCategory));
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <ChartContainer config={{}} className="w-full h-full">
        <BarChart data={chartData} margin={{ bottom: 60 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="category"
            tickLine={false}
            tickMargin={10}
            interval={0}
            axisLine={false}
            tick={{
              fontSize: 12,
              width: 100,
            }}
            textAnchor="middle"
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
