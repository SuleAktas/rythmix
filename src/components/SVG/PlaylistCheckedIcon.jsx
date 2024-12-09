import React from "react";

const PlaylistCheckedIcon = (props) => (
  <svg
    className={`icon ${props.className || ""}`}
    onClick={props.onClick}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 11h12"
      stroke="#1ED760"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <path
      d="m15 15 2 2 4-4"
      stroke="#1ED760"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 7h12M4 15h8"
      stroke="#1ED760"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </svg>
);
export default PlaylistCheckedIcon;
