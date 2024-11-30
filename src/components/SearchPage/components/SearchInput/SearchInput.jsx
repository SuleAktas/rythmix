import React from "react";
import { useState } from "react";
import FullSearchPage from "../../../FullSearchPage/FullSearchPage";

import "./SearchInput.css";
import SearchIcon from "../../../SVG/TabIcons/SearchIcon";

function SearchInput({ fullPage = false }) {
  const [isFullPageComponentVisible, setIsFullPageComponentVisible] =
    useState(false);

  const handleSearchClick = () => {
    if (!fullPage) setIsFullPageComponentVisible(true);
  };
  const handleClose = () => {
    setIsFullPageComponentVisible(false);
  };

  return (
    <div className="search-input">
      <SearchIcon />
      <input
        className="input"
        placeholder="What do you wanna listen to?"
        onClick={handleSearchClick}
      />
      {!fullPage && isFullPageComponentVisible && (
        <FullSearchPage onClose={handleClose} />
      )}
    </div>
  );
}

export default SearchInput;
