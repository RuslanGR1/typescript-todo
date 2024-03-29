const MenuAlt = ({ width = 6, height = 6 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-${height} w-${width}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h7"
    />
  </svg>
);

export default MenuAlt;
