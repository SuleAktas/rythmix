import React from "react";

const FilledPlayIcon = (props) => (
  <svg
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}
  >
    <circle cx={28} cy={28} r={28} fill="#1ED760" />
  </svg>
);
export default FilledPlayIcon;
