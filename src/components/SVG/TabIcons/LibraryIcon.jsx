import React from "react";

const LibraryIcon = (props) => (
  <svg
    onClick={props.onClick}
    className={`icon ${props.className || ""}`}
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill={props.isSelected ? "white" : "#B3B3B3"}
      d="M14.87 2.634a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21.5a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-18a1 1 0 0 1 .5-.866Zm1.5 2.598V20.5h4V7.541l-4-2.309ZM3.37 22.5a1 1 0 0 1-1-1v-18a1 1 0 1 1 2 0v18a1 1 0 0 1-1 1Zm6 0a1 1 0 0 1-1-1v-18a1 1 0 1 1 2 0v18a1 1 0 0 1-1 1Z"
    />
  </svg>
);
export default LibraryIcon;
