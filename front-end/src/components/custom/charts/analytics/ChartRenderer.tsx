import TimeBarchart from "./TimeBarchart";
import CategoryBarchart from "./CategoryBarchart";
import { DateRange } from "react-day-picker";
import CategoryPiechart from "./CategoryPiechart";
import CategoryPiechartGrid from "./grid/CategoryPiechartGrid";
import CategoryBarchartGrid from "./grid/CategoryBarchartGrid";
import { GET_TRANSACTIONS_BY_USER_ID } from "@/lib/graphql/Transaction";
import { useQuery } from "@apollo/client";
import { useAuth } from "@/lib/contexts/authContext";
import { GET_CATEGORIES_BY_USER_ID } from "@/lib/graphql/Category";
import IoBarchartGrid from "./grid/IoBarchartGrid";
import NoChartAvailable from "./NoChartAvailable";
import { useMemo } from "react";
import { isInDateRange } from "@/lib/utils";
import { Transaction } from "@/__generated__/graphql";

type Props = {
  dateRange: DateRange | undefined;
  viewType: string;
  chartType: string;
  dataType: string;
};

const ChartRenderer = ({ dateRange, viewType, chartType, dataType }: Props) => {
  const auth = useAuth();
  const userId = auth.userId;
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useQuery(GET_TRANSACTIONS_BY_USER_ID, {
    variables: { userId: userId },
  });
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES_BY_USER_ID, {
    variables: { userId: userId },
  });
  const transactions =
    useMemo(() => {
      const data = transactionsData?.getTransactionsByUserId || [];
      if (dateRange) {
        return data.filter((transaction: Transaction) => isInDateRange(dateRange, transaction.date));
      } else {
        return data; 
      }
    }, [transactionsData, dateRange]);
  const categories = categoriesData?.getCategoriesByUserId || [];

  if (viewType === "SINGLE") {
    if (chartType === "BAR") {
      if (dataType === "TIME") {
        return (
          <TimeBarchart dateRange={dateRange} transactions={transactions} />
        );
      } else if (dataType === "CATEGORY") {
        return (
          <CategoryBarchart
            dateRange={dateRange}
            categories={categories}
            transactions={transactions}
          />
        );
      } else {
        return <NoChartAvailable />;
      }
    } else if (chartType === "PIE") {
      if (dataType === "CATEGORY") {
        return (
          <CategoryPiechart
            dateRange={dateRange}
            categories={categories}
            transactions={transactions}
            borderOff={true}
          />
        );
      } else {
        return <NoChartAvailable />;
      }
    } else {
      return <NoChartAvailable />;
    }
  } else if (viewType === "MULTI") {
    if (chartType === "BAR") {
      if (dataType === "CATEGORY") {
        return (
          <CategoryBarchartGrid
            dateRange={dateRange}
            categories={categories}
            transactions={transactions}
          />
        );
      } else if (dataType === "IO") {
        return (
          <IoBarchartGrid dateRange={dateRange} transactions={transactions} />
        );
      } else {
        return <NoChartAvailable />;
      }
    } else if (chartType === "PIE") {
      if (dataType === "CATEGORY") {
        return (
          <CategoryPiechartGrid
            dateRange={dateRange}
            categories={categories}
            transactions={transactions}
          />
        );
      } else {
        return <NoChartAvailable />;
      }
    }
  } else {
    <NoChartAvailable />;
  }
};

export default ChartRenderer;
