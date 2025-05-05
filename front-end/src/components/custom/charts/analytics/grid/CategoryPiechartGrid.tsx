import { DateRange } from "react-day-picker";

type Props = {
  dateRange: DateRange | undefined;
}

const CategoryPiechartGrid= ({ dateRange }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1>Category Pie Chart</h1>
      <p>Data Type: Category</p>
    </div>
  );
}

export default CategoryPiechartGrid; 