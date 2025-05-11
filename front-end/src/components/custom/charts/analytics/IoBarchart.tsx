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
import { BarChart, Cell, LabelList, ResponsiveContainer } from "recharts";
import { DateRange } from "react-day-picker";
import { CartesianGrid, XAxis, Bar, Rectangle } from "recharts";
import { label } from "framer-motion/client";

type Props = {
  dateRange: DateRange | undefined;
  transactions: Transaction[];
};

const IoBarchart = ({ dateRange, transactions }: Props) => {
  const chartData = [
    {
      io: "Income",
      total: 0,
      fill: "#82ca9d",
    },
    {
      io: "Expenses",
      total: 0,
      fill: "#8884d8",
    },
  ];

  transactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      chartData[0].total += transaction.amount;
    } else {
      chartData[1].total -= transaction.amount;
    }
  });

  const chartConfig = {
    total: {
      label: "Amount:"
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="io"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
          />
          <Bar dataKey="total" strokeWidth={2} radius={8}/>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default IoBarchart;
