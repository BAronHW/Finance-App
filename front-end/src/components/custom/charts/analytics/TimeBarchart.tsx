import { DateRange } from "react-day-picker";

type Props = {
  dateRange: DateRange | undefined;
}

const TimeBarchart = ({ dateRange }: Props) => {  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1>Time Bar Chart</h1>
      <p>Data Type: Time</p>
    </div>
  );
}

export default TimeBarchart;