import { checkStatus } from "./checkStatus";

type ItemType = {
  startDate: string;
  endDate: string;
};

type StatusType = "Current" | "Upcoming" | "Archive";

export const getByStatus = <T extends ItemType>(
  items: T[],
  status: StatusType,
): T[] =>
  items.filter(
    (item: T) => checkStatus(item.startDate, item.endDate) === status,
  );
