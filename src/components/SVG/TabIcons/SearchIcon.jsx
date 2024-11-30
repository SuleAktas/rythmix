import React from "react";

const SearchIcon = (props) => (
  <svg
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="#B3B3B3"
      d="M13.3 3.747a1 1 0 0 0-1 0l-7.5 4.33V20.5h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6h4.5V8.077l-7.5-4.33Zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21.5a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3.8a1 1 0 0 1-1-1V8.077a2 2 0 0 1 1-1.732l7.5-4.33Z"
    />
  </svg>
);
export default SearchIcon;
