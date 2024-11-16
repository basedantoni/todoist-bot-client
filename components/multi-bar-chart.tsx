"use client";

import React from "react";

import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "./ui/card";

type DayData = {
  day: string;
  userOne: number;
  userTwo: number;
};

const chartConfig = {
  userOne: {
    label: "Jacob",
    color: "#2563eb",
  },
  userTwo: {
    label: "Anthony",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function MultiBarChart({ data }: { data: DayData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Tasks</CardTitle>
        <CardDescription>Weekly</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="userOne" fill="var(--color-userOne)" radius={4} />
            <Bar dataKey="userTwo" fill="var(--color-userTwo)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
