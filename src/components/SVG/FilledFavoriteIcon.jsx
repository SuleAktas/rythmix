import React from "react";

const FilledFavoriteIcon = (props) => (
  <svg
    className={`icon ${props.className || ""}`}
    onClick={props.onClick}
    width={24}
    height={24}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <path
      fill="white"
      fillOpacity="0.698"
      d="M11.434 1a4.604 4.604 0 00-3.226 1.322L8 2.527l-.208-.205A4.589 4.589 0 004.566 1 4.589 4.589 0 001.34 2.322 4.5 4.5 0 000 5.522a4.5 4.5 0 001.34 3.2l6.133 6.061a.75.75 0 001.054 0l6.132-6.06a4.52 4.52 0 00.992-1.467 4.482 4.482 0 00-.992-4.934A4.604 4.604 0 0011.433 1z"
    />
  </svg>
);
export default FilledFavoriteIcon;
