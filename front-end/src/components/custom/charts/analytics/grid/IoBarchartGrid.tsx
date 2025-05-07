import { Category, Transaction } from "@/__generated__/graphql";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

type Props = {
  dateRange: DateRange | undefined;
  categories: Category[];
  transactions: Transaction[];
}

const IoBarchartGrid = ({ dateRange, categories, transactions }: Props) => {
  const transactionsByMonth: Record<number, Transaction[]> = {};
    transactions.forEach((transaction) => {
      const month = dayjs.unix(transaction.date).month();
      if (!transactionsByMonth[month]) {
        transactionsByMonth[month] = [];
      }
      transactionsByMonth[month].push(transaction);
    });
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1>Time Bar Chart</h1>
      <p>Data Type: Time</p>
    </div>
  );
}

export default IoBarchartGrid;