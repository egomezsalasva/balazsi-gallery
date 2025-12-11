type ArrowProps = React.SVGProps<SVGSVGElement>;

const Arrow = ({ ...props }: ArrowProps) => {
  return (
    <svg
      viewBox="0 0 28 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 9.31102H28V13.311H2V9.31102Z" fill="currentColor" />
      <path
        d="M0 11.3137L11.3137 0L14.1421 2.82843L2.82843 14.1421L0 11.3137Z"
        fill="currentColor"
      />
      <path
        d="M2.83691 8.47997L14.1506 19.7937L11.3222 22.6221L0.00848699 11.3084L2.83691 8.47997Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Arrow;
