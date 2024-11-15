import Image from "next/image";

import { MultiBarChart } from "../components/multi-bar-chart";
import { getDay } from "date-fns";

export default async function Home() {
  const userOneResponse = await fetch(
    `${process.env.BASE_API_URL}/api/snapshots/user/1`
  );
  const userOneData = await userOneResponse.json();

  const userTwoResponse = await fetch(
    `${process.env.BASE_API_URL}/api/snapshots/user/2`
  );
  const userTwoData = await userTwoResponse.json();

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
      <div className="grid">
        <MultiBarChart data={dayData} />
      </div>
    </div>
  );
}
