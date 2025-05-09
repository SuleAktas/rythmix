import React from "react";

const PlaylistAddIcon = (props) => (
  <svg
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-playlist-add"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M19 8h-14" />
    <path d="M5 12h9" />
    <path d="M11 16h-6" />
    <path d="M15 16h6" />
    <path d="M18 13v6" />
  </svg>
);
export default PlaylistAddIcon;
