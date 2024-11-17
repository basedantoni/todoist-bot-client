import Image from "next/image";

import TotalTasks from "@/components/total-tasks";
import { MultiBarChart } from "@/components/multi-bar-chart";
import { ContributionChart } from "@/components/contribution-chart";
import { Snapshot } from "@/types";

export const revalidate = 60;

export default async function Home() {
  const fetchProjectUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_API_URL}/api/projects/1/users`
      );
      if (!response.ok) {
        throw new Error(`Error fetching project users: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { projectUsers } = await fetchProjectUsers();

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

  const fetchSnapshotData = async (userId: number) => {
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

  const userSnapshots: Record<string, Snapshot[]> = {};

  for (const user of projectUsers) {
    const { snapshots } = await fetchSnapshotData(user.id);
    userSnapshots[user.name] = snapshots;
  }

  return (
    <div className="grid grid-rows-[16px_1fr_16px] items-center justify-items-center min-h-screen p-8 pb-20 gap-12 sm:py-10 sm:px-20">
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
      <div className="w-full sm:grid-cols-auto-fill-300 grid space-y-4 sm:space-y-0 sm:gap-3 overscroll-contain">
        <MultiBarChart data={userSnapshots} />
        <TotalTasks completedTasks={completedTasks.totalCompletedTasks.total} />
        {Object.entries(userSnapshots).map(([userName, contributions]) => (
          <ContributionChart
            key={userName}
            title={userName}
            contributions={contributions}
          />
        ))}
      </div>
    </div>
  );
}
