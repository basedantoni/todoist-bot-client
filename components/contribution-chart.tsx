"use client";

import React from "react";

import ActivityCalendar, {
  Activity,
  ThemeInput,
} from "react-activity-calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useTheme } from "next-themes";
import { useWindowSize } from "@uidotdev/usehooks";

import { formatRFC3339, subMonths } from "date-fns";
import { Contribution } from "@/types";

export function ContributionChart({
  title,
  contributions,
}: {
  title: string;
  contributions: Contribution[];
}) {
  const { theme } = useTheme();
  const size = useWindowSize();

  console.log(size.width);

  const monthOffset: number = size.width
    ? size.width < 768
      ? 3
      : size.width <= 1024
      ? 7
      : 8
    : 8;

  const startDate = formatRFC3339(subMonths(new Date(), monthOffset)).split(
    "T"
  )[0];
  const currentDate = formatRFC3339(new Date()).split("T")[0];

  // Check if contributions is undefined before further processing
  if (!contributions) {
    return (
      <Card className="w-full h-52 animate-pulse bg-zinc-300 dark:bg-zinc-800"></Card>
    );
  }

  // Create a copy of contributions for processing without mutating the original data
  const contributionMap = new Map<string, Activity>();

  contributions.forEach((c: Contribution) => {
    const date = new Date(c.createdAt).toLocaleDateString("en-CA"); // Convert to local date in ISO format (YYYY-MM-DD)
    const activity = contributionMap.get(date);
    if (activity) {
      activity.count += c.completedTasks;
      activity.level = Math.min(Math.floor(activity.count / 60), 3);
    } else {
      contributionMap.set(date, {
        date,
        count: c.completedTasks,
        level: Math.min(Math.floor(c.completedTasks / 2), 3),
      });
    }
  });

  const contributionData = [
    contributionMap.get(startDate) ?? {
      date: startDate,
      count: 0,
      level: 0,
    },
    ...contributionMap.values(),
    contributionMap.get(currentDate) ?? {
      date: currentDate,
      count: 0,
      level: 0,
    },
  ];

  console.log("Contribution Data\n", contributionData);

  const explicitTheme: ThemeInput = {
    light: ["#f0f0f0", "#6eacf8", "#3c85e0", "#237be9"],
    dark: ["#4d4d4d", "#60a5fa", "#2876d6", "#0052b8"],
  };

  return (
    <Card className="overflow-hidden min-w-56 w-full col-span-2 row-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        <ActivityCalendar
          colorScheme={
            theme === "system" ? undefined : theme === "dark" ? "dark" : "light"
          }
          data={contributionData}
          loading={false}
          maxLevel={3}
          theme={explicitTheme}
        />
      </CardContent>
    </Card>
  );
}
