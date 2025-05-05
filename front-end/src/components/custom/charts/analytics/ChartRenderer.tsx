import TimeBarchart from "./TimeBarchart";
import CategoryBarchart from "./CategoryBarchart";
import { DateRange } from "react-day-picker";
import CategoryPiechart from "./CategoryPiechart";
import CategoryPiechartGrid from "./grid/CategoryPiechartGrid";
import TimeBarchartGrid from "./grid/TimeBarchartGrid";
import CategoryBarchartGrid from "./grid/CategoryBarchartGrid";

type Props = {
  dateRange: DateRange | undefined;
  viewType: string;
  chartType: string;
  dataType: string;
};

const ChartRenderer = ({ dateRange, viewType, chartType, dataType }: Props) => {
  console.log("ChartRenderer", dateRange, viewType, chartType, dataType);
  if (viewType === "SINGLE") {
    if (chartType === "BAR") {
      if (dataType === "TIME") {
        return <TimeBarchart dateRange={dateRange} />;
      } else if (dataType === "CATEGORY") {
        return <CategoryBarchart dateRange={dateRange} />;
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
