import { SVGProps } from "react";

type PauseIconProps = SVGProps<SVGSVGElement>;

const PauseIcon = ({ ...props }: PauseIconProps) => {
  return (
    <svg
      width="15"
      height="22"
      viewBox="0 0 15 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="4" height="22" fill="currentColor" />
      <rect x="11" width="4" height="22" fill="currentColor" />
    </svg>
  );
};

export default PauseIcon;
