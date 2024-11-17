import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalTasks({
  completedTasks,
}: {
  completedTasks: number;
}) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Total Completed Tasks</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center lg:pt-24">
        <p className="text-8xl font-bold">{completedTasks}</p>
      </CardContent>
    </Card>
  );
}
