import React from "react";
import "./LibraryHeader.css";
import SearchIcon from "../../../SVG/TabIcons/SearchIcon";

function LibraryHeader() {
  return (
    <div className="header-container">
      <div className="header-exp">
        <div className="header-name-capital">
          <span>S</span>
        </div>
        <div className="header-name">
          <span>Kitaplığın</span>
        </div>
      </div>

      <div className="header-action-buttons">
        <SearchIcon />
      </div>
    </div>
  );
}

export default LibraryHeader;
