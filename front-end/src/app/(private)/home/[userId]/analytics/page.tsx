"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/custom/datepickers/DatePickerWithRange";
import ChartRenderer from "@/components/custom/charts/analytics/ChartRenderer";

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [viewType, setViewType] = useState("SINGLE");
  const [chartType, setChartType] = useState("BAR");
  const [dataType, setDataType] = useState("TIME");
  return (
    <div>
      <Card>
        <CardHeader className="items-center">
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription className="text-center">
            Visualise your transaction history and spending habits over time with a wide range of chart formats.<br/>
            Select the date range, view type, chart type, and data type to customise your analytics experience. Multi-view currently only supports a monthly view.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex place-content-around pt-6">
          <DatePickerWithRange
            className="self-center"
            date={dateRange}
            setDate={(range: DateRange | undefined) => setDateRange(range)}
          />
          <RadioGroup defaultValue="SINGLE">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="SINGLE"
                id="SINGLE"
                onClick={() => setViewType("SINGLE")}
              />
              <Label htmlFor="SINGLE">Single View</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="MULTI"
                id="MULTI"
                onClick={() => setViewType("MULTI")}
              />
              <Label htmlFor="MULTI">Multi-view</Label>
            </div>
          </RadioGroup>
          <RadioGroup defaultValue="BAR">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="BAR"
                id="BAR"
                onClick={() => setChartType("BAR")}
              />
              <Label htmlFor="BAR">Bar Chart</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="PIE"
                id="PIE"
                onClick={() => setChartType("PIE")}
              />
              <Label htmlFor="PIE">Pie Chart</Label>
            </div>
          </RadioGroup>
          <RadioGroup defaultValue="TIME">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="TIME"
                id="TIME"
                onClick={() => setDataType("TIME")}
              />
              <Label htmlFor="TIME">Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="CATEGORY"
                id="CATEGORY"
                onClick={() => setDataType("CATEGORY")}
              />
              <Label htmlFor="CATEGORY">Category</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="IO"
                id="IO"
                onClick={() => setDataType("IO")}
              />
              <Label htmlFor="IO">In / Out</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      <ChartRenderer
        dateRange={dateRange}
        viewType={viewType}
        chartType={chartType}
        dataType={dataType}
      />
    </div>
  );
};

export default AnalyticsPage;
