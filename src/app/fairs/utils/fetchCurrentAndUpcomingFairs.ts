import { getByStatus } from "@/utils/getByStatus";
import { fetchFairs } from "./fetchFairs";

export const fetchCurrentAndUpcomingFairs = async () => {
  const fairs = await fetchFairs();
  const currentFairs = getByStatus(fairs, "Current");
  const upcomingFairs = getByStatus(fairs, "Upcoming").sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
  return [...currentFairs, ...upcomingFairs];
};
