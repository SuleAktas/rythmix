import React from "react";
import "./LibraryHeader.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from "@mui/icons-material/Add";

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
        <SearchOutlinedIcon size="xl" />
        <AddIcon size="xl" />
      </div>
    </div>
  );
}

export default LibraryHeader;
