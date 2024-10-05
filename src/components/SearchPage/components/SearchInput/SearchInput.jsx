import React from "react";
import "./SearchInput.css";

function SearchInput() {
  const SEARCHICON = process.env.PUBLIC_URL + "/images/SEARCHICON.png";

  return (
    <div className="search-input">
      <img src={SEARCHICON}></img>
      What do you wanna listen to?
    </div>
  );
}

export default SearchInput;
