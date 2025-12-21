type CrossProps = React.SVGProps<SVGSVGElement>;

const Cross = ({ ...props }: CrossProps) => {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.82861 1.12057e-05L21.2134 18.3848L18.385 21.2132L0.000186205 2.82844L2.82861 1.12057e-05Z"
        fill="currentColor"
      />
      <path
        d="M0 18.3848L18.3848 0L21.2132 2.82843L2.82843 21.2132L0 18.3848Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Cross;
