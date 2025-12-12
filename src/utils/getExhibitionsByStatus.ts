import { checkStatus } from "./checkStatus";

type ExhibitionType = {
  startDate: string;
  endDate: string;
};

type StatusType = "Current" | "Upcoming" | "Archive";

export const getExhibitionsByStatus = (
  exhibitions: ExhibitionType[],
  status: StatusType,
) =>
  exhibitions.filter(
    (exhibition: ExhibitionType) =>
      checkStatus(exhibition.startDate, exhibition.endDate) === status,
  );
