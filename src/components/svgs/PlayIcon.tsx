import { SVGProps } from "react";

type PlayIconProps = SVGProps<SVGSVGElement>;

const PlayIcon = ({ ...props }: PlayIconProps) => {
  return (
    <svg
      width="15"
      height="22"
      viewBox="0 0 15 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15 11L0 22L9.93699e-07 0L15 11Z" fill="currentColor" />
    </svg>
  );
};

export default PlayIcon;
