"use client";

import React from "react";
import { DayData, Snapshot } from "@/types";
import { getDay } from "date-fns";

import { Bar, BarChart, XAxis } from "recharts";

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
  const chartColors = ["#2563eb", "#60a5fa", "#2876d6", "#0D47A0", "#4d4d4d"];
  const chartConfig: Record<string, { label: string; color: string }> =
    {} satisfies ChartConfig;

  for (const [index, key] of Object.keys(data).entries()) {
    chartConfig[key] = {
      label: key,
      color: chartColors[index],
    };
  }

  const createDayData = (keys: string[]): DayData[] => {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) =>
      keys.reduce((acc, key) => ({ ...acc, [key]: 0 }), { day })
    );
  };

  const dayData = createDayData(Object.keys(data));

  for (const [key, value] of Object.entries(data)) {
    for (const item of value) {
      const day = getDay(new Date(item.createdAt));

      dayData[day] = {
        ...dayData[day],
        [key]: !item.completedTasks ? 0 : item.completedTasks,
      };
    }
  }

  return (
    <Card className="sm:col-span-2">
      <CardHeader>
        <CardTitle>Completed Tasks</CardTitle>
        <CardDescription>Weekly</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
          <BarChart accessibilityLayer data={dayData}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
