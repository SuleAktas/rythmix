import React from "react";
import { useState } from "react";
import FullSearchPage from "../../../FullSearchPage/FullSearchPage";
import "./SearchInput.css";

function SearchInput({ fullPage = false }) {
  const SEARCHICON2 = process.env.PUBLIC_URL + "/images/SEARCHICON2.png";
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
      <img src={SEARCHICON2}></img>
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
