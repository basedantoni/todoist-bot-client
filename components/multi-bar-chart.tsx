"use client";

import React, { useEffect, useState } from "react";
import { ChartData, Snapshot } from "@/types";
import { format, subDays, addDays } from "date-fns";

import { Bar, BarChart, XAxis, LineChart, CartesianGrid, Line } from "recharts";
import { ChartColumnBig, ChartLine } from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export function MultiBarChart({ data }: { data: Record<string, Snapshot[]> }) {
  const rangeOptions = [7, 14, 30, 90];
  const [selectedRange, setSelectedRange] = useState<number>(7);

  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const startDate = subDays(new Date(), selectedRange);

    const chartData: ChartData[] = [];
    const emptyData = Object.keys(data).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {} as Record<string, number>);

    for (let i = startDate; i <= new Date(); i = addDays(i, 1)) {
      chartData.push({
        date: format(i, "MMM d"),
        ...emptyData,
      });
    }

    for (const [key, value] of Object.entries(data)) {
      for (const item of value) {
        const dayPrior = subDays(new Date(item.createdAt), 1);
        const formattedDate = format(dayPrior, "MMM d");

        const chartDataItem = chartData.find(
          (chartItem) => chartItem.date === formattedDate
        );

        if (chartDataItem) {
          chartDataItem[key] = item.completedTasks;
        }
      }
    }

    setChartData(chartData);
  }, [selectedRange]);

  const chartColors = ["#2563eb", "#60a5fa", "#2876d6", "#0D47A0", "#4d4d4d"];
  const chartConfig: Record<string, { label: string; color: string }> =
    {} satisfies ChartConfig;

  for (const [index, key] of Object.keys(data).entries()) {
    chartConfig[key] = {
      label: key,
      color: chartColors[index],
    };
  }

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <CardTitle className="flex sm:flex-row flex-col sm:items-center gap-4">
          <p className="text-xs sm:text-lg">Completed Tasks</p>
          <div className="w-fit flex gap-2 p-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm">
            <button
              className={`flex items-center justify-center rounded-[0.2rem] ${
                chartType === "line"
                  ? "text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              }`}
              onClick={() => setChartType("line")}
            >
              <ChartLine className="w-6 h-6" />
            </button>
            <button
              className={`flex items-center justify-center rounded-[0.2rem] ${
                chartType === "bar"
                  ? "text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              }`}
              onClick={() => setChartType("bar")}
            >
              <ChartColumnBig className="w-6 h-6" />
            </button>
          </div>
        </CardTitle>
        <CardDescription className="w-fit flex gap-1 p-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm">
          {rangeOptions.map((option) => (
            <button
              key={option}
              className={`w-9 h-7 flex items-center justify-center rounded-[0.2rem] ${
                selectedRange === option
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              }`}
              onClick={() => setSelectedRange(option)}
            >
              {option}d
            </button>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
          {chartType === "bar" ? (
            <BarChart accessibilityLayer data={chartData}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {Object.keys(data).map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={`var(--color-${key})`}
                  radius={4}
                />
              ))}
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {Object.keys(data).map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  stroke={`var(--color-${key})`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
