import { Category, InOrOutEnum, Transaction } from "@/__generated__/graphql";
import { DateRange } from "react-day-picker";
import { ChartDataType } from "../../header/Header";
import { isInDateRange } from "@/lib/utils";
import { DARK_GRAY, DEFAULT_COLOUR } from "@/lib/constants";
import { PieChartComponent } from "../PiechartComponent";
import { useMemo } from "react";
import { title } from "process";

type Props = {
  dateRange: DateRange | undefined;
  categories: Category[];
  transactions: Transaction[];
  borderOff?: boolean;
  titleOff?: boolean;
  dateLabelOff?: boolean;
};

const CategoryPiechart = ({
  dateRange,
  categories,
  transactions,
  borderOff,
  titleOff,
  dateLabelOff,
}: Props) => {
  const spendingPerCategory = useMemo(() => {
    const map = new Map<number | null, number>();
    categories.forEach((category: Category) => {
      map.set(category.id, 0);
    });
    transactions
      .filter((transaction) => transaction.io === InOrOutEnum.Out)
      .filter((transaction) =>
        dateRange ? isInDateRange(dateRange, transaction.date) : true
      )
      .forEach((transaction: Transaction) => {
        if (map.has(transaction.categoryId ?? null)) {
          const current = map.get(transaction.categoryId ?? null)!;
          map.set(transaction.categoryId ?? null, current + transaction.amount);
        }
      });
    return map;
  }, [categories, transactions, dateRange]);

  const totalOut = useMemo(() => {
    return transactions
      .filter((transaction) =>
        dateRange ? isInDateRange(dateRange, transaction.date) : true
      )
      .map((transaction) => (transaction.amount >= 0 ? transaction.amount : 0))
      .reduce((total, currentValue) => total + currentValue, 0);
  }, [transactions, dateRange]);

  const chartData: ChartDataType[] =
    categories.map((category: Category) => {
      return {
        category: category.name,
        spending: spendingPerCategory.get(category.id) ?? 0,
        fill: category.colour ?? DEFAULT_COLOUR,
      };
    }) ?? [];

  chartData.push({
    category: "Uncategorised",
    spending: totalOut
      ? totalOut -
        chartData
          .map((dataPoint: ChartDataType) => dataPoint.spending ?? 0)
          .reduce((total, currentValue) => total + currentValue, 0)
      : 0,
    fill: DARK_GRAY,
  });
  return (
    <PieChartComponent
      chartData={chartData}
      dateRange={dateRange}
      totalOut={totalOut}
      borderOff={borderOff}
      titleOff={titleOff}
      dateLabelOff={dateLabelOff}
    />
  );
};

export default CategoryPiechart;
