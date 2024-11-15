// "use client";

// import React from "react";

// import ActivityCalendar, {
//   Activity,
//   ThemeInput,
// } from "react-activity-calendar";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import { Tooltip as MuiTooltip } from "@mui/material";
// import { useTheme } from "next-themes";
// import { useWindowSize } from "@uidotdev/usehooks";

// import { formatRFC3339, subMonths } from "date-fns";

// export function ContributionChart({ title }: { title: string }) {
//   const { theme } = useTheme();
//   const size = useWindowSize();

//   const monthOffset: number = size.width
//     ? size.width < 768
//       ? 2
//       : size.width <= 1024
//       ? 3
//       : 4
//     : 2;

//   const startDate = formatRFC3339(subMonths(new Date(), monthOffset)).split(
//     "T"
//   )[0];
//   const currentDate = formatRFC3339(new Date()).split("T")[0];

// //   const { data: contributions, isLoading } = useQuery({
// //     queryKey: ["contributions", id],
// //     queryFn: () => indexContributions(id),
// //   });

//   // Check if contributions is undefined before further processing
// //   if (!contributions) {
// //     return (
// //       <Card className="w-full h-52 animate-pulse bg-zinc-300 dark:bg-zinc-800"></Card>
// //     );
// //   }

//   // Create a copy of contributions for processing without mutating the original data
//   const contributionMap = new Map<string, Activity>();

//   contributions.forEach((c: Contribution) => {
//     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     const date = new Date(c.createdAt).toLocaleDateString("en-CA", {
//       timeZone,
//     }); // Convert to local date in ISO format (YYYY-MM-DD)
//     const activity = contributionMap.get(date);
//     if (activity) {
//       activity.count += c.timeSpent;
//       activity.level = Math.min(Math.floor(activity.count / 60), 3);
//     } else {
//       contributionMap.set(date, {
//         date,
//         count: c.timeSpent,
//         level: Math.min(Math.floor(c.timeSpent / 60), 3),
//       });
//     }
//   });

//   const contributionData = [
//     contributionMap.get(startDate) ?? {
//       date: startDate,
//       count: 0,
//       level: 0,
//     },
//     ...contributionMap.values(),
//     contributionMap.get(currentDate) ?? {
//       date: currentDate,
//       count: 0,
//       level: 0,
//     },
//   ];

//   const explicitTheme: ThemeInput = {
//     light: ["#F0F0F0", "#ffecc6", "#ffc766", "#ffa420"],
//     dark: ["#4D4D4D", "#ea8f53", "#e46d2b", "#d55421"],
//   };

//   return (
//     <div className="transform transition-transform duration-300 hover:-translate-y-1 hover:translate-x-0.5">
//       <Card className="overflow-hidden min-w-56 w-full">
//         <CardHeader>
//           <CardTitle>{title}</CardTitle>
//         </CardHeader>
//         <CardContent className="flex gap-4">
//           <ActivityCalendar
//             colorScheme={
//               theme === "system"
//                 ? undefined
//                 : theme === "dark"
//                 ? "dark"
//                 : "light"
//             }
//             data={contributionData}
//             hideColorLegend
//             hideMonthLabels
//             hideTotalCount
//             loading={isLoading}
//             maxLevel={3}
//             renderBlock={(block, activity) => (
//               <MuiTooltip
//                 title={`${activity.count} minutes on ${activity.date}`}
//               >
//                 {block}
//               </MuiTooltip>
//             )}
//             theme={explicitTheme}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
