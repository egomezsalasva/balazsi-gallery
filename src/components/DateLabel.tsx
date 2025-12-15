import { formatDate } from "@/utils/formatDate";

type DateLabelType = {
  startDate: string;
  endDate?: string;
  withMargin?: boolean;
} & React.HTMLAttributes<HTMLParagraphElement>;

const DateLabel = ({
  startDate,
  endDate,
  withMargin,
  ...props
}: DateLabelType) => {
  return (
    <p style={withMargin ? { marginBottom: "1.5rem" } : undefined} {...props}>
      {formatDate(startDate)}
      {endDate && ` — ${formatDate(endDate)}`}
    </p>
  );
};

export default DateLabel;
