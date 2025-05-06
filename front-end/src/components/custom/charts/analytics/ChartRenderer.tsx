import TimeBarchart from "./TimeBarchart";
import CategoryBarchart from "./CategoryBarchart";
import { DateRange } from "react-day-picker";
import CategoryPiechart from "./CategoryPiechart";
import CategoryPiechartGrid from "./grid/CategoryPiechartGrid";
import TimeBarchartGrid from "./grid/TimeBarchartGrid";
import CategoryBarchartGrid from "./grid/CategoryBarchartGrid";
import { GET_TRANSACTIONS_BY_USER_ID } from "@/lib/graphql/Transaction";
import { useQuery } from "@apollo/client";
import { useAuth } from "@/lib/contexts/authContext";
import { GET_CATEGORIES_BY_USER_ID } from "@/lib/graphql/Category";

type Props = {
  dateRange: DateRange | undefined;
  viewType: string;
  chartType: string;
  dataType: string;
};

const ChartRenderer = ({ dateRange, viewType, chartType, dataType }: Props) => {
  const auth = useAuth();
  const userId = auth.userId
  const { data: transactionsData, loading: transactionsLoading, error: transactionsError } = useQuery(GET_TRANSACTIONS_BY_USER_ID, {
    variables: { userId: userId },
  })
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(GET_CATEGORIES_BY_USER_ID, {
    variables: { userId: userId },
  })
  const transactions = transactionsData?.getTransactionsByUserId || [];
  const categories = categoriesData?.getCategoriesByUserId || [];
  
  if (viewType === "SINGLE") {
    if (chartType === "BAR") {
      if (dataType === "TIME") {
        return <TimeBarchart dateRange={dateRange} transactions={transactions} />;
      } else if (dataType === "CATEGORY") {
        return <CategoryBarchart dateRange={dateRange} categories={categories} transactions={transactions} />;
      }
    } else if (chartType === "PIE") {
      if (dataType === "CATEGORY") {
        return <CategoryPiechart dateRange={dateRange} />;
      }
    }
  } else if (viewType === "MULTI") {
    if (chartType === "BAR") {
      if (dataType === "TIME") {
        return <TimeBarchartGrid dateRange={dateRange} />;
      } else if (dataType === "CATEGORY") {
        return <CategoryBarchartGrid dateRange={dateRange} />;
      } else if (dataType === "IO") {
        return <TimeBarchartGrid dateRange={dateRange} />;
      }
    } else if (chartType === "PIE") {
      if (dataType === "CATEGORY") {
        return <CategoryPiechartGrid dateRange={dateRange} />;
      }
    } else {
      return (
        <div>
          <h1 className="text-2xl font-bold">No chart available</h1>
          <p className="text-gray-500">Please select a valid chart type.</p>
        </div>
      );
    }
  }
};

export default ChartRenderer;
