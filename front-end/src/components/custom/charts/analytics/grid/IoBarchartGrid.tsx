import { Category, Transaction } from "@/__generated__/graphql";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";
import IoBarchart from "../IoBarchart";

type Props = {
  dateRange: DateRange | undefined;
  transactions: Transaction[];
}

const IoBarchartGrid = ({ dateRange, transactions }: Props) => {
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
            <IoBarchart
              dateRange={undefined}
              transactions={monthTransactions}
            />
          </div>
        );
      })}
    </div>
  );
}

export default IoBarchartGrid;