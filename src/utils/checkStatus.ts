export const checkStatus = (startDate: string, endDate: string) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  if (startDateObj > new Date()) {
    return "Upcoming";
  } else if (endDateObj < new Date()) {
    return "Archive";
  } else {
    return "Current";
  }
};
