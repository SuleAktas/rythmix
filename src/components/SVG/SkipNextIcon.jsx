import React from "react";

const SkipNextIcon = (props) => (
  <svg
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M24.35 4a.933.933 0 0 0-.933.933v9.074L7.483 4.808a.933.933 0 0 0-1.4.808v20.768a.934.934 0 0 0 1.4.808l15.934-9.199v9.074a.933.933 0 0 0 .933.933h2.133a.933.933 0 0 0 .934-.933V4.933A.933.933 0 0 0 26.483 4H24.35Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.75 0h32v32h-32z" />
      </clipPath>
    </defs>
  </svg>
);
export default SkipNextIcon;
