"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BaseSyntheticEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/custom/datepickers/DatePickerWithRange";

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [viewType, setViewType] = useState("SINGLE");
  const [chartType, setChartType] = useState("BAR");
  const [dataType, setDataType] = useState("TIME");
  return (
    <div>
      <Card>
        <CardContent className="flex place-content-around">
          <DatePickerWithRange
            date={dateRange}
            setDate={(range: DateRange | undefined) => setDateRange(range)}
          />
          <RadioGroup defaultValue="SINGLE">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="SINGLE"
                id="SINGLE"
                onSelect={() => setViewType("SINGLE")}
              />
              <Label htmlFor="SINGLE">Single View</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="MULTI"
                id="MULTI"
                onSelect={() => setViewType("MULTI")}
              />
              <Label htmlFor="MULTI">Multi-view</Label>
            </div>
          </RadioGroup>
          <RadioGroup defaultValue="BAR">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="BAR"
                id="BAR"
                onSelect={() => setChartType("BAR")}
              />
              <Label htmlFor="BAR">Bar Chart</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="PIE"
                id="PIE"
                onSelect={() => setChartType("PIE")}
              />
              <Label htmlFor="PIE">Pie Chart</Label>
            </div>
          </RadioGroup>
          <RadioGroup defaultValue="TIME">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="TIME"
                id="TIME"
                onSelect={() => setDataType("TIME")}
              />
              <Label htmlFor="TIME">Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="CATEGORY"
                id="CATEGORY"
                onSelect={() => setDataType("CATEGORY")}
              />
              <Label htmlFor="CATEGORY">Category</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="IO"
                id="IO"
                onSelect={() => setDataType("IO")}
              />
              <Label htmlFor="IO">In / Out</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
