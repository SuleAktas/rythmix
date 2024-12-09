import React from "react";

const DevicesIcon = (props) => (
  <svg
    className={`icon ${props.className || ""}`}
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g fill="#fff" clipPath="url(#a)">
      <path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75Zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5Zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75ZM4 15H2v-1.5h2V15Z" />
      <path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default DevicesIcon;
