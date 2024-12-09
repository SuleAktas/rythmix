import React from "react";

const SkipPreviousIcon = (props) => (
  <svg
    className={`icon ${props.className || ""}`}
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#A7A7A7"
        d="M8.65 4a.933.933 0 0 1 .933.933v9.074l15.934-9.199a.934.934 0 0 1 1.4.808v20.768a.933.933 0 0 1-1.4.808L9.583 17.993v9.074A.933.933 0 0 1 8.65 28H6.517a.933.933 0 0 1-.934-.933V4.933A.933.933 0 0 1 6.517 4H8.65Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.25 0h32v32h-32z" />
      </clipPath>
    </defs>
  </svg>
);
export default SkipPreviousIcon;
