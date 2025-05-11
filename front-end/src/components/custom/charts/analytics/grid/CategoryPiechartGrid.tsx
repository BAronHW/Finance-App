import { DateRange } from "react-day-picker";
import { Category, Transaction } from "@/__generated__/graphql";
import dayjs from "dayjs";
import CategoryPiechart from "../CategoryPiechart";

type Props = {
  dateRange: DateRange | undefined;
  transactions: Transaction[];
  categories: Category[];
};

const CategoryPiechartGrid = ({
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
            <CategoryPiechart
              dateRange={undefined}
              transactions={monthTransactions}
              categories={categories}
              borderOff={true}
              titleOff={true}
              dateLabelOff={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPiechartGrid;
