import React from "react";

const ShareIcon = (props) => (
  <svg
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M12.875 2a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.25 3.125a2.625 2.625 0 1 1 .754 1.841L5.75 8l5.254 3.034a2.625 2.625 0 1 1-.704 1.326l-5-2.889a2.625 2.625 0 1 1 0-2.943l5-2.888a2.637 2.637 0 0 1-.051-.516l.001.001Zm-7.125 3.75a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm9.75 4.875a1.126 1.126 0 1 0 0 2.251 1.126 1.126 0 0 0 0-2.251Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ShareIcon;
