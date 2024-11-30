import React from "react";

const PlaylistCheckedIcon = (props) => (
  <svg
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={48}
    height={48}
    {...props}
  >
    <defs>
      <path id="a" d="M0 0h48v48H0V0z" />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <path
      d="M28 20H4v4h24v-4zm0-8H4v4h24v-4zM4 32h16v-4H4v4zm39-9 3 3-13.99 14L23 31l3-3 6.01 6L43 23z"
      clipPath="url(#b)"
    />
  </svg>
);
export default PlaylistCheckedIcon;
