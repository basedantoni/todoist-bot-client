import { useQuery } from "@tanstack/react-query";
import { Snapshot } from "@/types";

export const useGetUserSnapshots = (
  userId: number,
  startDate: Date,
  initialData: Record<string, Snapshot[]>
) => {
  return useQuery({
    queryKey: ["userSnapshots", userId, startDate],
    queryFn: () =>
      fetch(`${process.env.BASE_API_URL}/api/snapshots/user/${userId}`).then(
        (res) => res.json()
      ),
    initialData: { snapshots: initialData },
  });
};
