import { Category, Transaction } from "@/__generated__/graphql";
import dayjs from "dayjs";
import { Cat } from "lucide-react";
import { DateRange } from "react-day-picker";
import { object } from "zod";
import CategoryBarchart from "../CategoryBarchart";

type Props = {
  dateRange: DateRange | undefined;
  transactions: Transaction[];
  categories: Category[];
};

const CategoryBarchartGrid = ({
  dateRange,
  transactions,
  categories,
}: Props) => {
  const transactionsByMonth: Record<number, Transaction[]> = {};
  transactions.forEach((transaction) => {
    const month = dayjs.unix(transaction.date).month();
    if (!transactionsByMonth[month]) {
      transactionsByMonth[month] = [];
    }
    transactionsByMonth[month].push(transaction);
  });

  return (
    <div className="grid grid-cols-2 gap-8">
      {Object.keys(transactionsByMonth).map((month) => {
        const monthNumber = Number(month);
        const monthTransactions = transactionsByMonth[monthNumber];
        return (
          <div className="flex flex-col gap-8 items-center" key={monthNumber}>
            <h3 className="scroll-m-20 text-2xl font-md tracking-tight mt-6">
              {dayjs().month(monthNumber).format("MMMM")}
            </h3>
            <CategoryBarchart
              dateRange={undefined}
              transactions={monthTransactions}
              categories={categories}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBarchartGrid;
