import React from "react";

const DetailsIcon = (props) => (
  <svg
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M10.5 4.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm0 15a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm0-7.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default DetailsIcon;
