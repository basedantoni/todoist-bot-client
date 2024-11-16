import Image from "next/image";

import { MultiBarChart } from "../components/multi-bar-chart";
import { getDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 60;

export default async function Home() {
  const fetchCompletedTasks = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_API_URL}/api/snapshots/completed`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching completed tasks: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return { snapshots: [] };
    }
  };

  const completedTasks = await fetchCompletedTasks();

  const fetchData = async (userId: number) => {
    try {
      const response = await fetch(
        `${process.env.BASE_API_URL}/api/snapshots/user/${userId}`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching data for user ${userId}: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return { snapshots: [] };
    }
  };

  const userOneData = await fetchData(2);
  const userTwoData = await fetchData(1);

  const dayData = [
    { day: "Sun", userOne: 0, userTwo: 0 },
    { day: "Mon", userOne: 0, userTwo: 0 },
    { day: "Tue", userOne: 0, userTwo: 0 },
    { day: "Wed", userOne: 0, userTwo: 0 },
    { day: "Thu", userOne: 0, userTwo: 0 },
    { day: "Fri", userOne: 0, userTwo: 0 },
    { day: "Sat", userOne: 0, userTwo: 0 },
  ];

  for (const item of userOneData.snapshots) {
    const day = getDay(new Date(item.createdAt));
    dayData[day] = {
      ...dayData[day],
      userOne: item.completedTasks,
    };
  }

  for (const item of userTwoData.snapshots) {
    const day = getDay(new Date(item.createdAt));
    dayData[day] = {
      ...dayData[day],
      userTwo: item.completedTasks,
    };
  }
  return (
    <div className="grid grid-rows-[16px_1fr_16px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex items-center gap-4">
        <Image
          src="/img/ponyo.webp"
          alt="Ponyo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <h1 className="text-4xl font-bold">Todoist Bot</h1>
      </div>
      <div className="w-full sm:grid-cols-auto-fill-300 grid gap-3 overscroll-contain">
        <MultiBarChart data={dayData} />
        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center sm:pt-10">
            <p className="text-8xl font-bold">
              {completedTasks.totalCompletedTasks.total}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
