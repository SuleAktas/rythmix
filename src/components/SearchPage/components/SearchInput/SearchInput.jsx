import React from "react";
import "./SearchInput.css";

function SearchInput() {
  const SEARCHICON2 = process.env.PUBLIC_URL + "/images/SEARCHICON2.png";

  return (
    <div className="search-input">
      <img src={SEARCHICON2}></img>
      <input className="input" placeholder="What do you wanna listen to?" />
    </div>
  );
}

export default SearchInput;
