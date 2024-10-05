import React from "react";
import "./Header.css";

function Header() {
  const SETTINGS = process.env.PUBLIC_URL + "/images/SETTINGS.png";
  return (
    <div className="header">
      <div className="header-title">Good morning</div>
      <img src={SETTINGS} alt="settings"></img>
    </div>
  );
}

export default Header;
